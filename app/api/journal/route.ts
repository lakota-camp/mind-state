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
      content: 'Write about your day!',
    },
  });

  // Revalidate cache to update data
  revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
