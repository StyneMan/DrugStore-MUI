/* eslint-disable @typescript-eslint/no-explicit-any */
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export default function formatDate(date: any) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
