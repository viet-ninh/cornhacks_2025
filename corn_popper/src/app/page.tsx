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
        <div className="flex_item overflow: 'hidden'">
          <CornClick/>
        </div>
        <div className="flex_item overflow: 'hidden'">
          {/* center screen goes here */}

        </div>
        <div className="flex_item p-4" >
          <div className="h-full overflow-y-auto">
            <ItemList />
          </div>
        </div>
      </div>
    </ClickProvider>
  );
}
