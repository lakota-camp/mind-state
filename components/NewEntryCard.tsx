'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    // Data returned from API call util function
    const data = await createNewEntry();
    // Route to journal given id
    router.push(`journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow hover:bg-black/5"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
