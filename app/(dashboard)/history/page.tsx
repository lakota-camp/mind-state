import HistoryChart from '@/components/HistoryChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import formateDateTime from '@/utils/formatDate';
const getData = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const sum = analysis.reduce(
    (total, current) => total + current.sentimentScore,
    0
  );

  const avg = Math.round(sum / analysis.length);

  return { analysis, avg, sum };
};
const History = async () => {
  const { avg, analysis, sum } = await getData();
  console.log('Analysis:', analysis);
  console.log('Avg Analysis:', avg);
  console.log('Total Analysis:', sum);

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <div className="pt-5 font-semibold text-3xl">Journal History</div>
        <div className="py-4 font-semibold text-lg">{`Average sentiment: ${avg}`}</div>
      </div>
      <div className="w-full h-full flex justify-center">
        <div className="w-full h-full flex justify-center">
          <HistoryChart data={analysis} />
        </div>
      </div>
    </div>
  );
};

export default History;
