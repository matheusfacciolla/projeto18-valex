import dayjs from "dayjs";

function formatDate() {
  const formatDateExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");
  return formatDateExpiration;
}

export default formatDate;
