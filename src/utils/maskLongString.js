export const maskLongString = (str) => {
  if (str.length <= 12) return str; // If the string is too short, return it as is
  return `${str.slice(0, 8)}...${str.slice(-4)}`;
};
