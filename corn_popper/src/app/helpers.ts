

export function getCost(level: number) : number {
  return Math.pow(10, level);
}

export function formatNumber(num : number) : string {
  return num % 1 === 0 
    ? num.toLocaleString('en-US') 
    : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });}