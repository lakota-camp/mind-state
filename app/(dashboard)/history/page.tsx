import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getData = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {},
  });
};
const History = () => {
  return <div>History</div>;
};

export default History;
