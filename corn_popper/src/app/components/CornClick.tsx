'use client'
import "./../globals.css"
import Image from 'next/image';
import cornImage from '../../../public/CornHackLogo.png';

import { useState } from 'react';


export default function CornClick() {
      
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
    };
     
    return (
    <div className="center_align_column text_style corn_click_column">
        <div className="farm_name_container rounded_corners">
            <h1 className="farm_name">Farm Name</h1>
        </div>
        <div className="corn_info_container">
            <h1 className="corn_count">{clickCount} Cookies</h1>
            <h3 className="corn_per_second">per second: 0</h3>
        </div>
        <Image 
                src={cornImage}
                alt="Corn Hack Logo" 
                onClick={handleClick}
            />
    </div>
    );
}