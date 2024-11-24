function formatDate(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthAbbreviation = months[monthIndex];

  return `${day}-${monthAbbreviation}-${year}`;
}

export default formatDate;

export function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${day}-${months[monthIndex]}-${year} | ${
    hours % 12 || 12
  }:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

  return formattedDate;
}

export function calculateAge(dob: string): number {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDiff = currentDate.getTime() - dobDate.getTime();

  // Calculate the age based on milliseconds
  const ageInMilliseconds = new Date(timeDiff);

  // Extract year from age
  const age = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

  return age;
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleTimeString([], options);
};
