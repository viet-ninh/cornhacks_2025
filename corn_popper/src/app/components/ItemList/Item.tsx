'use client';
import Cookies from 'js-cookie';
import { useClickContext } from "../CornItemContext";
import { useEffect, useState } from 'react';
import * as Helpers from '../../helpers';
import Image from 'next/image';

export default function Item() {
  const { cornCount, setCornCount, items, setItems, setFinal } = useClickContext();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null); // Track hovered item ID
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
  }, []); // Empty dependency array ensures it runs only once after the component mounts

  const BuyItem = (item: { id: number; name: string; cost: number; CPS: number; count: number }) => {
    if (cornCount >= item.cost) {
      const sound = new Audio("/CornSound.mp3");
      sound.load()
      sound.play()
      const newAmount = cornCount - item.cost;
      setCornCount(newAmount); // Deduct the cost from cornCount
      Cookies.set('cornCount', newAmount.toString(), { expires: 365 });
      setItems((prevItems) => {
        const updatedItems = prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, count: prevItem.count + 1, cost: Math.ceil(prevItem.cost * 1.15) } : prevItem
        );

        const updatedItem = updatedItems.find(i => i.id === item.id);
        if (updatedItem) {
          Cookies.set(`item_id_${item.id}`, JSON.stringify(updatedItem), { expires: 365 });
        }
        
        if (item.id === 11){
          setFinal(true);
        }

        return updatedItems;
      });

    } else {
      console.log('Not enough cookies to buy this item.');
    }
  };

  return (
    items.map((item, index) => {

      const buttonStyle = cornCount >= item.cost
      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
      : "bg-gray-500 hover:bg-yellow-600 text-gray-300 cursor-not-allowed opacity-50";

      return (
        <li key={index} className={`item_button block rounded-lg p-3 ${buttonStyle} transition-all duration-300`}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => BuyItem(item)} >
            {/* Column for name and cost */}
            <div style={{ marginRight: '10px', alignContent: 'center'}}>
              <Image
                  src={`/passive-worker/sprite-${item.id}.png`}
                  alt='?'
                  width={40}
                  height={40}
              />
            </div>

            <div style={{ flex: 1 , fontSize: '22px', fontWeight: 'bold' }}>
              <div>{item.name}</div>
              <div style={{ fontSize: '16px' }}>
                🌽{Helpers.formatNumber(item.cost)}
              </div>
            </div>
            
            {/* Column for item count */}
            <div style={{ fontSize: '24px', fontWeight: 'bold', alignContent: 'center', paddingRight: '10px'}}>
              {item.count === 0 ? null : item.count}
            </div>
          </div>

          {/* Floating Tooltip */}
          {hoveredItem !== null && (
            <div
              className="absolute bg-gray-800 text-white text-xs rounded shadow-lg p-2 z-50 pointer-events-none"
              style={{
                top: mousePos.y + 10, // Position slightly below cursor
                left: mousePos.x - 180, // Position to the left of cursor
                width: "150px",
                position: "fixed", // Keeps tooltip from moving elements
              }}
            >
              <p><strong>{items.find(i => i.id === hoveredItem)?.name}</strong></p>
              <p>Cost: 🌽{Helpers.formatNumber(items.find(i => i.id === hoveredItem)?.cost || 0)}</p>
              <p>Generates: {items.find(i => i.id === hoveredItem)?.CPS} corn/sec</p>
              <p>Owned: {items.find(i => i.id === hoveredItem)?.count}</p>
            </div>
          )}
        </li>
      );
    })
  );
}
