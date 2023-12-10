const defaultDate = () => {
    const pcDate = new Date();
    const year = pcDate.getFullYear();
    const month = pcDate.getMonth() + 1; // Month 0-11
    const day = pcDate.getDate();
    let currentDate;
  
    if (day < 10) {
      const newday = `0${day}`;
      currentDate = `${year}-${month}-${newday}`;
    } else {
      currentDate = `${year}-${month}-${day}`;
    }
  
    return currentDate;
  };
  
  export default defaultDate;
  