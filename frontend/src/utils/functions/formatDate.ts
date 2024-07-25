import moment from "moment";

const formatDate = (date: Date): string => {
  moment.locale("en");
  const formattedDate = moment(date).format("D/M/YYYY");
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatDate;
