import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// Function to create entry
export const POST = async () => {
  // Get user
  const user = await getUserByClerkId();
  // Get entry
  const entry = await prisma.journalEntry.create({
    // Create entry
    data: {
      userId: user.id,
      content: `Write about your day!`,
    },
  });

  // Analysis API call
  const analysis = await analyze(entry.content);

  // Error handling to check if analysis data is defined
  if (!analysis) {
    throw new Error(
      'Analysis is undefined. Please check the analyze function.'
    );
  }

  // Safe analysis data to db
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: analysis?.mood,
      summary: analysis?.summary,
      color: analysis?.color,
      negative: analysis?.negative,
      subject: analysis?.subject,
    },
  });

  // Revalidate cache to update data
  revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
