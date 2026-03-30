function formatDateTime(dateString) {
  // testcase: DatLT - TimeFormat_InvalidDate_Fail (TIME14.4)
  if (!dateString || isNaN(new Date(dateString))) return 'Invalid Date'
  const date = new Date(dateString)

  // Format the date using Intl.DateTimeFormat
  const options = {
    weekday: 'long', // Display the day of the week
    year: 'numeric', // Display the year
    month: 'long', // Display the full month name
    day: 'numeric', // Display the day of the month
    hour: 'numeric', // Display the hour
    minute: 'numeric', // Display the minute
    hour12: true, // Use 12-hour format with AM/PM
  }

  // testcase: DatLT - TimeFormat_FullFormat_Success (TIME14.1)
  // testcase: DatLT - TimeFormat_Midnight_Success (TIME14.2)
  // testcase: DatLT - TimeFormat_EarlyMorning_Success (TIME14.3)
  // Convert the date to the desired format
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function getDateDifference(startDate, endDate) {
  // Convert the start and end date strings to Date objects
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Normalize both dates to midnight to ensure time doesn't affect the result
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  // Calculate the difference in milliseconds and convert to days
  const diffInMilliseconds = end - start
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)

  // testcase: DatLT - TimeFormat_SameDate_Success (TIME14.5)
  // testcase: DatLT - TimeFormat_OneDayApart_Success (TIME14.6)
  // testcase: DatLT - TimeFormat_LeapYear_Success (TIME14.7)
  // testcase: DatLT - TimeFormat_ReverseOrder_Success (TIME14.8)
  // testcase: DatLT - TimeFormat_MonthBoundary_Success (TIME14.9)
  return diffInDays
}

function formatDateTimeExceptHour(dateString) {
  // testcase: DatLT - TimeFormat_InvalidInput_Fail (TIME14.13)
  if (!dateString || isNaN(new Date(dateString))) return 'Invalid Date'
  const date = new Date(dateString)

  // Format the date using Intl.DateTimeFormat
  const options = {
    weekday: 'long', // Display the day of the week
    year: 'numeric', // Display the year
    month: 'long', // Display the full month name
    day: 'numeric', // Display the day of the month
  }

  // testcase: DatLT - TimeFormat_StandardDate_Success (TIME14.10)
  // testcase: DatLT - TimeFormat_StartOfMonth_Success (TIME14.11)
  // testcase: DatLT - TimeFormat_LeapYearDate_Success (TIME14.12)
  // Convert the date to the desired format
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export { formatDateTime, getDateDifference, formatDateTimeExceptHour }
