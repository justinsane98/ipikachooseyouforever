const ConvertDateToUsString = (date) => {
    if (date) {
      let str = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
      return str;
    } else {
      return null;
    }
  }
  
  export default ConvertDateToUsString