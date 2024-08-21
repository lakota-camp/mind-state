'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

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

  // Refine vector search to include context of all entries some how. Search results only include a small context window.
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        ></input>
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-6 py-2 rounded-lg text-lg m-5"
        >
          Ask
        </button>
      </form>
      <div>
        {loading && <div>loading...</div>}
        {response && (
          <div className="py-6 px-6 my-4 bg-black/5 border rounded-md shadow text-lg">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
