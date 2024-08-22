'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Cross1Icon } from '@radix-ui/react-icons';
const Question = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);

    setResponse(answer);
    setValue('');
    setLoading(false);
  };

  const handleDelete = () => {
    setResponse(false);
  };
  // Refine vector search to include context of all entries some how. Search results only include a small context window.
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row w-full">
              <Input
                disabled={loading}
                onChange={onChange}
                value={value}
                type="text"
                placeholder="Ask a question"
                className="w-1/4"
              />
              <Button variant="outline" disabled={loading} type="submit">
                Ask
              </Button>
            </div>
          </div>
        </form>
        <div>
          {/* Loading state skeleton */}
          {loading ? (
            <Skeleton className="rounded-md py-6 px-6 my-4" />
          ) : (
            // Response
            response && (
              <div className="py-6 px-6 my-4 bg-zinc-50 border rounded-md shadow text-lg flex justify-between">
                <div className="px-8 p-10">{response}</div>
                <div className="flex justify-end">
                  <Button onClick={handleDelete} variant="outline">
                    <Cross1Icon />
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
