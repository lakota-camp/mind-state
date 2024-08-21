import { OpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { PromptTemplate } from '@langchain/core/prompts';

// Prompt template
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
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
    model: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });

  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};
