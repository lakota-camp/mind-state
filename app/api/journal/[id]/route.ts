import { NextResponse } from 'next/server';
import { getUserByClerkId } from '../../../../utils/auth';
import { prisma } from '../../../../utils/db';
import { analyze } from '@/utils/ai';
import { revalidatePath } from 'next/cache';

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();
  // Function to update journal entry
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  // Function to update analysis
  const updated = await prisma.analysis.upsert({
    // If found update
    where: {
      entryId: updatedEntry.id,
    },
    // If not found create a new analysis
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });
  // Return data with the spread of updatedEntry and the updated analysis data
  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};

export const DELETE = async (request, { params }) => {
  try {
    const user = await getUserByClerkId();

    console.log('User ID:', user.id);
    console.log('Entry ID:', params.id);

    const deleteEntry = await prisma.journalEntry.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
    });

    return new Response(
      JSON.stringify({ message: 'Entry deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting entry:', error);
    return (
      new Response(JSON.stringify({ error: 'Failed to delete the entry.' })),
      {
        status: 500,
      }
    );
  }
};
