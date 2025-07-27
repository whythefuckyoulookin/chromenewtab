export function dateDiffInDays(firstDate: Date, secondDate: Date) {
  firstDate.setHours(0, 0, 0, 0);
  secondDate.setHours(0, 0, 0, 0);
  return (
    Math.floor(
      Math.abs(secondDate.getTime() - firstDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) - 1
  );
}
