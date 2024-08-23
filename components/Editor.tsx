'use client';

import { deleteEntry, updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { Textarea } from './ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import LoadingSpinner from './LoadingSpinner';

const Editor = ({ entry }) => {
  const router = useRouter();
  if (!entry) {
    return <LoadingSpinner />;
  }
  // Set init value of state to the journal entry content
  const [value, setValue] = useState(entry.content);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Analysis state
  const [analysis, setAnalysis] = useState(entry.analysis || {});

  const { mood, summary, color, subject, negative, sentimentScore } =
    analysis || {};

  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Sentiment Score', value: sentimentScore },
  ];

  // Hook to autosave edited text
  useAutosave({
    data: value,
    // _value and value both represent the value, _value is the more updated value (need more clarification to understand this)
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);

      setIsLoading(false);
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const success = await deleteEntry(entry.id);
      if (success) {
        mutate('/api/journal');
        router.push('/journal');
      } else {
        console.error('Failed to delete the entry.');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-3 gap-6 ">
      {/* Set loading state to true when text is savings */}
      <div className="col-span-2">
        {/* Text area for journal editing */}
        <Textarea
          placeholder="Type your message here."
          className="h-full p-8 outline-none bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-center text-lg p-6">
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle
            style={{ backgroundColor: color }}
            className="py-6 text-center"
          >
            <div className="bg-white py-2">Analysis</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-2 gap-4 px-4 py-4 border-b border-black/10"
              >
                <span className="font-semibold border-r border-black/10">
                  {item.name}
                </span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center text-lg p-6">
            {isLoading && <LoadingSpinner />}
          </div>
          <CardFooter className="flex justify-center items-center">
            <Button
              variant="default"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Editor;
