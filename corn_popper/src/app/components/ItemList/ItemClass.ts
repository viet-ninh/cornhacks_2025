export default class ItemClass {
  name: string;
  cost: number;
  CPS: number; // clicks per second
  count: number;
  constructor(name: string, cost: number, CPS: number, count: number) {
    this.name = name;
    this.cost = cost;
    this.CPS = CPS;
    this.count = count;
  }

  displayInfo(): string {
    return `Item: ${this.name}, Cost: ${this.cost} corn, CPS: ${this.CPS}, Count: ${this.count}`;
  }
}
