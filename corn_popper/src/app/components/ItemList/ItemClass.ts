export default class ItemClass {
  id: number;
  name: string;
  cost: number;
  CPS: number; // clicks per second
  count: number;
  constructor(id: number, name: string, cost: number, CPS: number, count: number) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.CPS = CPS;
    this.count = count;
  }

  displayInfo(): string {
    return `Item: Id: ${this.id}, Name: ${this.name}, Cost: ${this.cost} ${this.CPS}, Count: ${this.count}`;
  }
}
