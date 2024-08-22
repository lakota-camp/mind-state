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

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8 text-center md:text-left">Journal</h2>
      <div className="my-5">
        <Question />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
