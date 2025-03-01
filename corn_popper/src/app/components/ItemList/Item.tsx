'use client';
import CornClick from "../CornClick";
import Cookies from 'js-cookie';
import { useClickContext } from "../CornItemContext";

interface ItemProps {
  items: { id: number; name: string; cost: number; CPS: number; count: number }[];
}

export default function Item({ items }: ItemProps ) {

  const { cornCount, setCornCount } = useClickContext();

  const BuyItem = (item: { id: number; name: string; cost: number; CPS: number; count: number }) => {
    if (cornCount >= item.cost) {
      var newAmount = cornCount - item.cost;
      setCornCount(newAmount); // Deduct the cost from cornCount
      Cookies.set('cornCount', newAmount.toString(), { expires: 365}); 
      console.log(`Purchased: ${item.name}`);
      // You can also update the item's count or other logic here

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
