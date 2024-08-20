import { ChatOpenAI } from '@langchain/openai';

export const analyze = async (prompt) => {
  const model = new ChatOpenAI({
    temperature: 0,
    model: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });

  const aiMsg = await model.invoke([
    ['system', 'You are en expert on human behavior, psychology and emotions'],
    ['user', prompt],
  ]);
  aiMsg;

  return aiMsg.content;
};
