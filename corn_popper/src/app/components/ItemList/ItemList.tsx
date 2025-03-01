import Item from "./Item";
import ItemClass from "./ItemClass";

export default function ItemList() {
  const items: ItemClass[] = [
    new ItemClass("Farm", 1, 5, 2),
    new ItemClass("Robot", 2, 4, 1),
    new ItemClass("Space Gangster", 16, 3, 1),
  ];

  return (
    <nav className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 text-white p-4 shadow-lg">
      <ul className="space-y-4">
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded">
            Item 1
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded">
            Item 2
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 hover:bg-gray-700 rounded">
            Item 3
          </a>
        </li>
        <li>
          <Item items={items} />
        </li>
      </ul>
    </nav>
  );
}
