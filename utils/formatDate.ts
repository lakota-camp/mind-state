export default function formateDateTime(date) {
  const optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Enables 12-hour format with AM/PM
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(
    date
  );

  return `${formattedDate} - ${formattedTime}`;
}
