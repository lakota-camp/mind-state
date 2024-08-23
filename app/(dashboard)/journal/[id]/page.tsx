import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      // compound unique constraint: userId and id -> <userId_id>
      userId_id: {
        userId: user.id,
        id,
      },
    },
    // Similar to a join
    include: {
      analysis: true,
    },
  });
  return entry;
};

// FIXME: fix issue with no render on null values of analysis data.
const EntryPage = async ({ params }: { params: any }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
