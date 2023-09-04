export function getRandom(min, max) {
  if (min > max) {
    const temp = min;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}