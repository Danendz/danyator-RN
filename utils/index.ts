export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);
export function countNewLines(str: string): number {
  // This regex matches all occurrences of "\n"
  const matches = str.match(/\n/g);
  return matches ? matches.length : 0;
}