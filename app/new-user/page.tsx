import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/* Page is essentially a UI route 
-> logic to check if user is found in DB, 
if not found, new user is created. */

const createNewUser = async () => {
  const user = await currentUser();
  // Check if userId is found in DB
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });
  // If no match, create a new user
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect('/journal');
};

const NewUser = async () => {
  // Check if clerk user id is in database
  await createNewUser();

  return <div>loading...</div>;
};

export default NewUser;
