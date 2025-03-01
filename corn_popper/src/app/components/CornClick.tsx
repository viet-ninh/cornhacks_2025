'use client'
import "./../globals.css"
import Image from 'next/image'; // Import Next.js Image component
import cornImage from '../../../public/CornHackLogo.png'; // Import the image from the same folder

// import { useState } from "react";



let clickCount = 0;

export function setClickCount(count: number): void {
    clickCount = count;
}

export default function CornClick() {
    
    // const [clickCount, setClickCount] = useState(0);
  
    const handleClick = () => {
      setClickCount(clickCount + 1); // Increment click countlink
      console.log(clickCount);
    }
     
    return (
    <div className="center_align_column text_color corn_click_column">
        <h1 className="farm_name">Farm Name</h1>
        <h1 className="cookie_count">{clickCount} Cookies</h1>
        <h3 className="count_per_second">per second: 0</h3>
        <Image 
                src={cornImage} // No need to add './' or '/'; use the imported image
                alt="Corn Hack Logo" 
                onClick={handleClick}
            />
    </div>
    );
}