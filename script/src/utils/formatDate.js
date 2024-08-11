export const formatDate = (date) => {
  const data = new Date(date);

  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = String(data.getFullYear());
  const hours = String(data.getHours()).padStart(2, "0");
  const minutes = String(data.getMinutes()).padStart(2, "0");
  const seconds = String(data.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
  // return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const durationDate = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diff = end - start;

  const msInHour = 3600000;
  const msInMinute = 60000;
  const msInSecond = 1000;

  const hours = Math.floor(diff / msInHour);
  const minutes = Math.floor((diff % msInHour) / msInMinute);
  const seconds = Math.floor((diff % msInMinute) / msInSecond);

  return `${hours}:${minutes}:${seconds}`;
};