const createURL = (path) => {
  // window.location.origin gives the current URL
  return window.location.origin + path;
};

/* 
CRUD operations for journal entries
*/

// Create a new entry
export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

// Update an entry
export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const deleteEntry = async (id) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`), {
        method: 'DELETE',
      })
    );
    if (!res.ok) {
      throw new Error('Failed to delete the entry.');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Ask a question
export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
