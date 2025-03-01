'use client'
import "./../globals.css"
import Image from 'next/image';
import cornImage from '../../../public/CornHackLogo.png'; 
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';


export default function CornClick() {

    const [clickCount, setClickCount] = useState<number | null>(null);
    const [clickedPositions, setClickedPositions] = useState<{x: number, y: number, x_direction: number, y_direction: number, time_created: number}[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('clickCount');
        if (storedCount) {
            setClickCount(parseInt(storedCount));
        }
        setLoading(false); // Set loading to false after cookies are read
    }, []); // Empty dependency array ensures it runs only once after the component mounts


    const handleClick = (event: React.MouseEvent) => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        Cookies.set('clickCount', newCount.toString(), {expires: 365}); 
        
        // Get random number -1 to 1
        const x_direction = (Math.random() * 2) - 1
        const y_direction = (Math.random() * 2) - 1

        const newClick = {x: event.clientX, y: event.clientY, x_direction: x_direction, y_direction: y_direction, time_created: Date.now()};
        setClickedPositions((prevPositions) => [...prevPositions, newClick]);        
        // Set a timeout to remove the text after 1 second
        setTimeout(() => {
            setClickedPositions((prevPositions) => prevPositions.filter(click => click !== newClick));
        }, 1000);
    };
     
    return (
        <div className="center_align_column text_style corn_click_column">
        <div className="farm_name_container rounded_corners">
            <h1 className="farm_name">Farm Name</h1>
        </div>
        <div className="corn_info_container">
            <h1 className="corn_count">
                {clickCount !== null ? `${clickCount} Corn` : `Loading...`}
            </h1>
            <h3 className="corn_per_second">per second: 0</h3>
        </div>
        <Image 
                src={cornImage} 
                alt="Corn Hack Logo" 
                onClick={handleClick}
            />

            {/* Conditionally render texts at the cursor positions if clickedPositions is not empty */}
            {clickedPositions.map((position) => (
                <div
                    key={`${position.time_created}`} // Use the creation time as a key to uniquely identify each element
                    className="corn_plus_text"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        '--move-x': `${position.x_direction * 100}px`,
                        '--move-y': `${position.y_direction * 100}px`,
                    } as React.CSSProperties}>
                    +1 🌽Corn
                </div>
            ))}
    </div>
    );
}