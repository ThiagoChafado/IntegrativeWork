const defaultMonth = () => {
  const pcDate = new Date();
  const year = pcDate.getFullYear();
  const month = pcDate.getMonth() + 1; // Month 0-11
  let currentDate = `${year}-${month}`;

  return currentDate;
};

export default defaultMonth;
