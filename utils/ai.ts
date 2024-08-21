import { OpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { PromptTemplate } from '@langchain/core/prompts';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

// * FIXME: Do not load AI analysis on initial journal entry creation. * //

// Prompt template
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    summary: z.string().describe('Quick summary of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative or positive? Does the journal entry include negative positive or positive emotions?'
      ),
    color: z
      .string()
      .describe(
        'A hexadecimal color that represents the mood of the journal entry. Use colors that strongly represent the mood of the journal entry based on color psychology.'
      ),
  })
);

// Converting schema to prompt
const getPrompt = async (content: string) => {
  const formattedInstructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and provide your response as a plain JSON object without any code block markers or formatting. Only output the JSON object. \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);

  const model = new OpenAI({
    temperature: 0,
    model: 'gpt-4o',
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};

// Future update -> store in vector DB
// Function to ask questions on journal entry
export const qa = async (question, entries) => {
  // Convert entries into docs
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  });

  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });

  const chain = loadQARefineChain(model);
  // Create embedding from OpenAI API
  const embeddings = new OpenAIEmbeddings();
  // Create vector store
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  // Retrieve relevant docs -> based off questions, these are the entries that will be used to answer question.
  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
