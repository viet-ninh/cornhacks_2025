'use client'
import "./../globals.css"
import Image from 'next/image';
import cornImage from '../../../public/CornHackLogo.png'; 
import { useState } from 'react';
import Cookies from 'js-cookie';


export default function CornClick() {

    const initialCount = Cookies.get('clickCount') ? parseInt(Cookies.get('clickCount')!) : 0;
    const [clickCount, setClickCount] = useState<number>(initialCount);


    const handleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        Cookies.set('clickCount', newCount.toString(), { expires: 365}); 

    };
     
    return (
    <div className="center_align_column text_color corn_click_column">
        <h1 className="farm_name">Farm Name</h1>
        <h1 className="cookie_count">{clickCount} Cookies</h1>
        <h3 className="count_per_second">per second: 0</h3>
        <Image 
                src={cornImage} 
                alt="Corn Hack Logo" 
                onClick={handleClick}
            />
    </div>
    );
}