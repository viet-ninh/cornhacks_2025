
export default function ItemList(){
    return(
        <nav className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 text-white p-4 shadow-lg">
        <ul className="space-y-4">
            <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Item 1</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Item 2</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Item 3</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Item 4</a></li>
        </ul>
        </nav>
  );
}