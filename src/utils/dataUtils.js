export function isoToLocaleString(isoDate) {
  if (!isoDate) {
    return undefined;
  }
  return `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}`;
}
