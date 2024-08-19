'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }) => {
  // Set init value of state to the journal entry content
  const [value, setValue] = useState(entry.content);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Hook to autosave edited text
  useAutosave({
    data: value,
    // _value and value both represent the value, _value is the more updated value (need more clarification to understand this)
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      {/* Set loading state to true when text is savings */}
      {isLoading && <div>loading...</div>}
      {/* Text area for journal editing */}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
