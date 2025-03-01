'use client';
//import CornClick from "../CornClick";
import Cookies from 'js-cookie';
import { useClickContext } from "../CornItemContext";

// interface ItemProps {
//   items: { id: number; name: string; cost: number; CPS: number; count: number }[];
// }

// export default function Item({ items }: ItemProps ) {
export default function Item() {

  const { cornCount, setCornCount, items, setItems } = useClickContext();

  const BuyItem = (item: { id: number; name: string; cost: number; CPS: number; count: number }) => {
    if (cornCount >= item.cost) {
      const newAmount = cornCount - item.cost;
      setCornCount(newAmount); // Deduct the cost from cornCount
      Cookies.set('cornCount', newAmount.toString(), { expires: 365}); 
      console.log(`Purchased: ${item.name}`);
      // You can also update the item's count or other logic here
      //item with id = 1 currentItem = id = 1
      // items = [{item1}, {item2}, {item3}]
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, count: prevItem.count + 1 } : prevItem
        )
      );


    } else {
      console.log('Not enough cookies to buy this item.');
    }
  };
  
  return (
      items.map((item, index) => {      

        return (
          <li key={index} className="item_button block p-2 hover:bg-gray-700 rounded">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick= {() => BuyItem(item)} >
              {/* Column for name and cost */}
              <div style={{ flex: 1 }}>
                <div>{item.name}</div>
                <div style={{ fontSize: '12px' }}>
                  <img
                    src="CornHackLogo.png"
                    alt="Image"
                    style={{
                      height: '1em',
                      width: 'auto',
                      marginRight: '8px',
                      display: 'inline-flex',
                    }}
                  />
                  {item.cost}
                </div>
              </div>
              {/* Column for item count */}
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {item.count}
              </div>
            </div>
          </li>
        );
      })
  );
}
