import CornClick from './components/CornClick'
import ItemList from './components/ItemList/ItemList';
import { ClickProvider } from './components/CornItemContext';
import ResetButton from './components/ResetButton';
import PassiveWorkers from './components/PassiveWorkers';

import './globals.css'

export default function Home() {
  
  return (
    <ClickProvider>
      <div className="flex_container">
        <div className="flex_item overflow: 'hidden'">
          <ResetButton/>
          <CornClick/>
        </div>
        <div className="flex_item" style={{flex: 2}}>
          <PassiveWorkers/>
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
