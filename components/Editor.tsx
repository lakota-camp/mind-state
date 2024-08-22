'use client';

import { updateEntry } from '@/utils/api';
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

const Editor = ({ entry }) => {
  // Set init value of state to the journal entry content
  const [value, setValue] = useState(entry.content);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Analysis state
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative, sentimentScore } = analysis;

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

      // Update analysis state
      setAnalysis(data.analysis);

      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      {/* Set loading state to true when text is savings */}
      <div className="col-span-2">
        {isLoading && <div>loading...</div>}
        {/* Text area for journal editing */}
        <Textarea
          placeholder="Type your message here."
          className="h-3/4 p-8 outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle
            style={{ backgroundColor: color }}
            className="py-6 text-center rounded-md"
          >
            <div className="bg-white mx-56 p-4 rounded-md">Analysis</div>
          </CardTitle>
          <CardDescription className="text-center">
            Card Description
          </CardDescription>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Editor;
