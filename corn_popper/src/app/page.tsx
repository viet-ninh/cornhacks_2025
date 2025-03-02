import CornClick from './components/CornClick'
import ItemList from './components/ItemList/ItemList';
import { ClickProvider } from './components/CornItemContext';
import ResetButton from './components/ResetButton';
import './globals.css'

export default function Home() {
  return (
    <ClickProvider>
      <ResetButton/>
      <div className="flex_container">
        <div className="flex_item">
          <CornClick/>
        </div>
        <div className="flex_item">
          {/* center screen goes here */}

        </div>
        <div className="flex_item p-4" >
          <ItemList/>
        </div>
      </div>
    </ClickProvider>
  );
}
