import CornClick from './components/CornClick'
import ItemList from './components/ItemList/ItemList';
import './globals.css'

export default function Home() {
  return (
    <div className="flex_container">
      <div className="flex_item">
        <CornClick/>
      </div>
      <div className="flex_item">
        {/* center screen goes here */}
      </div>
      <div className="flex_item">
        <ItemList/>
      </div>
    </div>
  );
}
