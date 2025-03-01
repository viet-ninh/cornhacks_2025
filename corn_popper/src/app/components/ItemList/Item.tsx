import ItemClass from "./ItemClass";

interface ItemProps {
  items: ItemClass[]; // Expect an array of ItemClass instances
}

export default function Item({ items }: ItemProps) {
  return (
    <div>
      {items.map((item, index) => {
        const itemInstance = new ItemClass(
          item.name,
          item.cost,
          item.CPS,
          item.count
        );
        return (
          <div key={index} className="p-2 border-b">
            {itemInstance.displayInfo()}
          </div>
        );
      })}
    </div>
  );
}
