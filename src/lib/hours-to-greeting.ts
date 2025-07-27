export const hoursToGreeting = (h: number) => (
    h > 4 && h < 12 ? "Good morning"
  : h < 17 ? "Good afternoon"
  : "Good evening"
);