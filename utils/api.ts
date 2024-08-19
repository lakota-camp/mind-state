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
