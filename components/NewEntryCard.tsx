'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    // Data returned from API call util function
    const data = await createNewEntry();
    // Route to journal given id
    router.push(`journal/${data.id}`);
  };

  return (
    <>
      <Card
        className="h-full hover:bg-zinc-50 cursor-pointer"
        onClick={handleOnClick}
      >
        <CardHeader>
          <span className="text-xl font-semibold">New Entry</span>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
};

export default NewEntryCard;
