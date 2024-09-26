function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Format the date using Intl.DateTimeFormat
  const options = {
    weekday: "long", // Display the day of the week
    year: "numeric", // Display the year
    month: "long", // Display the full month name
    day: "numeric", // Display the day of the month
    hour: "numeric", // Display the hour
    minute: "numeric", // Display the minute
    hour12: true, // Use 12-hour format with AM/PM
  };

  // Convert the date to the desired format
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function getDateDifference(startDate, endDate) {
  // Convert the start and end date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Normalize both dates to midnight to ensure time doesn't affect the result
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds and convert to days
  const diffInMilliseconds = end - start;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return diffInDays;
}

export { formatDateTime, getDateDifference };
