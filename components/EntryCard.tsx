import formateDateTime from '@/utils/formatDate';

// ? Add a AI generated summary to each entry card

const EntryCard = ({ entry }) => {
  // Create and format date for entry
  const dateTime = formateDateTime(new Date(entry.createdAt));
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow hover:bg-black/5">
      <div className="px-4 py-5">{dateTime}</div>
      <div className="px-4 py-5">Summary</div>
      <div className="px-4 py-4">Mood</div>
    </div>
  );
};

export default EntryCard;
