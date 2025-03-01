'use client';
import ItemClass from "./ItemClass";

interface ItemProps {
  items: { name: string; cost: number; CPS: number; count: number }[];
}

// function handleItemClick(item : ItemClass) : undefined {
//   console.log("Item clicked: " + item.displayInfo)
// }

export default function Item({ items }: ItemProps ) {

  const test = () => {
    console.log("Item clicked");
  };
  
  return (
      items.map((item, index) => {      

        return (
          <li key={index} className="block p-2 hover:bg-gray-700 rounded">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick= {test} >
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
