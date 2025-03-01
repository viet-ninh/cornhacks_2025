import CornClick from './components/CornClick'
import ItemList from './components/ItemList/ItemList';
import { ClickProvider } from './components/CornItemContext';
import './globals.css'

export default function Home() {

  // TODO: we need to grab items from cookies/context 
  // and pass them down to our ItemList
  // var items = grabItems();

  return (
    <ClickProvider>
      <div className="flex_container">
        <div className="flex_item">
          <CornClick/>
        </div>
        <div className="flex_item">
          {/* center screen goes here */}

        </div>
        <div className="flex_item">
          <ItemList/>
          {/* <ItemList items={items}/> */}
        </div>
      </div>
    </ClickProvider>
  );
}
