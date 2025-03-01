import Item from "./Item";

export default function ItemList() {

  const items = [
    { id: 1, name: "Farm", cost: 1, CPS: 5, count: 0 },
    { id: 2, name: "Robot", cost: 2, CPS: 4, count: 0},
    { id: 3, name: "Space Gangster", cost: 16, CPS: 3, count: 0}
  ];

  return (
    <nav className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 text-white p-4 shadow-lg">
      <ul className="space-y-1">
        <Item items={items} />
      </ul>
    </nav>
  );
}
