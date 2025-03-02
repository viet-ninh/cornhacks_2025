export function getCost(level: number): number {
  return Math.pow(10, level);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return parseFloat((num / 1_000_000_000).toFixed(3)).toString() + " Billion";
  } else if (num >= 1_000_000) {
    return parseFloat((num / 1_000_000).toFixed(3)).toString() + " Million";
  } else {
    return parseFloat(num.toFixed(10)).toLocaleString("en-US");
  }
}
