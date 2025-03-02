export function getCost(level: number): number {
  return Math.pow(10, level);
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}
