import CornClick from './components/CornClick'
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
        {/* item_list goes here */}
      </div>
    </div>
  );
}
