import { parse } from "date-fns";
export const parseToDate = (date) => {
  const rs = parse(date, "yyyy/MM/dd", new Date());
  return rs;
};
