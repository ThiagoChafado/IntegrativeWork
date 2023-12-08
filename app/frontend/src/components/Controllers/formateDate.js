export function formatDate(fullDate) {
    const dateObject = new Date(fullDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }