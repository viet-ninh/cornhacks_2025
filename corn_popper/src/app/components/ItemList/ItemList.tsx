import Item from "./Item";

export default function ItemList() {
  return (
    <nav className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 text-white p-4 shadow-lg">
      <ul className="space-y-1">
        <Item />
      </ul>
    </nav>
  );
}
