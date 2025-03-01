'use client'
import "./../globals.css"
import Image from 'next/image';
import cornImage from '../../../public/CornHackLogo.png'; 
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { useClickContext } from "./CornItemContext";


export default function CornClick() {

    const { clickCount, setClickCount } = useClickContext();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('clickCount');
        if (storedCount) {
            setClickCount(parseInt(storedCount));
        }
        setLoading(false); // Set loading to false after cookies are read
    }, [setClickCount]); // Empty dependency array ensures it runs only once after the component mounts


    const handleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        Cookies.set('clickCount', newCount.toString(), { expires: 365}); 
        
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
                className="corn_click_image"
                src={cornImage} 
                alt="Corn Hack Logo" 
                onClick={handleClick}
            />
    </div>
    );
}