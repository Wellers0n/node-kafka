import moment from "moment";

type FormatDate = {
  date: string | Date;
};

function formatDatePTBR({ date }: FormatDate) {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
}

export default formatDatePTBR;
