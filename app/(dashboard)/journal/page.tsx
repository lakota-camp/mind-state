import { getUserByClerkId } from '../../../utils/auth';
import { prisma } from '../../../utils/db';
import NewEntryCard from '../../../components/NewEntryCard';
import EntryCard from '../../../components/EntryCard';
import Link from 'next/link';
import Question from '@/components/Question';

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

  return entries;
};

const getAnalysis = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  });
  return analysis;
};

const JournalPage = async () => {
  const entries = await getEntries();
  const analysis = await getAnalysis();

  return (
    <div className="h-full">
      <h2 className="text-2xl mb-8 text-center md:text-left">
        Journal Entries
      </h2>
      <div className="my-5">
        <Question />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} analysis={analysis} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
