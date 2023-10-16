export const timeAgo = (timestamp) => {
  /**
   * Convert a given timestamp into a human-readable "time ago" format.
   *
   * This function calculates the time difference between the current date and the provided timestamp
   * and returns a string indicating how long ago the timestamp occurred in a user-friendly format.
   *
   * @param {number} timestamp - The timestamp (in milliseconds) to convert.
   * @returns {string} A string representing the time elapsed since the provided timestamp.
   * Usage:
   *   const timestamp = 1634380800000; // Example timestamp
   *   const timeAgoString = timeAgo(timestamp);
   *   // Returns: "2 days ago" (or similar)
   */
  const currentDate = new Date();
  const createdAt = new Date(timestamp);
  const timeDifference = currentDate - createdAt;

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  if (timeDifference < oneSecond) {
    return "Just now";
  } else if (timeDifference < oneMinute) {
    const seconds = Math.floor(timeDifference / oneSecond);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < oneHour) {
    const minutes = Math.floor(timeDifference / oneMinute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < oneDay) {
    const hours = Math.floor(timeDifference / oneHour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < oneMonth) {
    const days = Math.floor(timeDifference / oneDay);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < oneYear) {
    const months = Math.floor(timeDifference / oneMonth);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / oneYear);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};
