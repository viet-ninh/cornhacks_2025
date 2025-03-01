'use client'
import "./../globals.css"
import Image from 'next/image';
import cornImage from '../../../public/CornHackLogo.png'; 
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';


export default function CornClick() {

    const [clickCount, setClickCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('clickCount');
        if (storedCount) {
            setClickCount(parseInt(storedCount));
        }
        setLoading(false); // Set loading to false after cookies are read
    }, []); // Empty dependency array ensures it runs only once after the component mounts


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