export default function formatReadableTime(dateTimeString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(undefined, options);
}
