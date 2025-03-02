import Item from "./Item";

export default function ItemList() {
  return (
    <div className="right_menu_column">
      <nav className="h-screen bg-gray-900 text-white p-4 shadow-lg overflow-y-auto">
        <ul className="space-y-1">
          <Item />
        </ul>
      </nav>
    </div>
  );
}
