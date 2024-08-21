'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

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
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-4 py-4 border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
