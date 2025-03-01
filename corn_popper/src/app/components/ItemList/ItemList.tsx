import Item from "./Item";
import ItemClass from "./ItemClass";

export default function ItemList() {
  // const items: ItemClass[] = [
  //   new ItemClass(1, "Farm", 1, 5, 2),
  //   new ItemClass(2, "Robot", 2, 4, 1),
  //   new ItemClass(3, "Space Gangster", 16, 3, 1),
  // ];

  const items = [
    { id: 1, name: "Farm", cost: 1, CPS: 5, count: 2 },
    { id: 2, name: "Robot", cost: 2, CPS: 4, count: 1},
    { id: 3, name: "Space Gangster", cost: 16, CPS: 3, count: 1}
  ];

  return (
    <nav className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 text-white p-4 shadow-lg">
      <ul className="space-y-1">
        <Item items={items} />
      </ul>
    </nav>
  );
}
