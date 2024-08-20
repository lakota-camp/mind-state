import React from 'react';
import { getUserByClerkId } from '../../../utils/auth';
import { prisma } from '../../../utils/db';
import NewEntryCard from '../../../components/NewEntryCard';
import EntryCard from '../../../components/EntryCard';
import Link from 'next/link';
import { analyze } from '@/utils/ai';

// Components

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const aiMsg = await analyze('Today was amazing!');

  return { entries, aiMsg };
};

const JournalPage = async () => {
  const { entries, aiMsg } = await getEntries();

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
      <div className="p-10">{aiMsg}</div>
    </div>
  );
};

export default JournalPage;
