'use client';
import Cookies from 'js-cookie';
import { useClickContext } from "../CornItemContext";
import {  useEffect } from 'react';
import * as Helpers from '../../helpers';

export default function Item() {

  const { cornCount, setCornCount, items, setItems } = useClickContext();

  useEffect(() => {
    const itemIds = items.map((item) => item.id);
    itemIds.forEach((itemId) => {
      const storedItem = Cookies.get(`item_id_${itemId}`);
      if (storedItem) {
        const parsedItem = JSON.parse(storedItem);
        setItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === parsedItem.id ? parsedItem : prevItem
          )
        );
      }
    });
}, [setItems]); // Empty dependency array ensures it runs only once after the component mounts

  const  BuyItem = (item: { id: number; name: string; cost: number; CPS: number; count: number }) => {
    if (cornCount >= item.cost) {
      const sound = new Audio("/CornSound.mp3");
      sound.load()
      sound.play()
      const newAmount = cornCount - item.cost;
      setCornCount(newAmount); // Deduct the cost from cornCount
      Cookies.set('cornCount', newAmount.toString(), { expires: 365}); 
      setItems((prevItems) => {
        const updatedItems = prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, count: prevItem.count + 1, cost: Math.ceil(prevItem.cost * 1.15) } : prevItem
        );
      
        const updatedItem = updatedItems.find(i => i.id === item.id);
        if (updatedItem) {
          Cookies.set(`item_id_${item.id}`, JSON.stringify(updatedItem), { expires: 365 });
        }
      
        return updatedItems;
      });

    } else {
      console.log('Not enough cookies to buy this item.');
    }
  };
  
  return (
      items.map((item, index) => {
        const affordable = cornCount >= item.cost || item.count > 0;   

        return (
          <li key={index} className="item_button block p-2 hover:bg-gray-700 rounded">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick= {() => BuyItem(item)} >
              {/* Column for name and cost */}
              <div style={{ flex: 1 }}>
                <div>{item.name}</div>
                <div style={{ fontSize: '12px' }}>
                🌽{Helpers.formatNumber(item.cost)}
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
