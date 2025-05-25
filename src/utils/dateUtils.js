export const getMonthName = (monthIndex) =>
  new Date(2000, monthIndex).toLocaleString("default", { month: "long" });

export const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  const firstDay = date.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(d);
  return days;
};
