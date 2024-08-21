import { qa } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { question } = await request.json();
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    // Select these field only
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  // Call qa function passing questions and entries
  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
