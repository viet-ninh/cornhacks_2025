'use client'
import "./../globals.css";
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { MTLLoader } from 'three-stdlib';
import { useClickContext } from "./CornItemContext";


export default function CornClick() {

    const { cornCount, setCornCount, items, setItems } = useClickContext();
    const [clickedPositions, setClickedPositions] = useState<{x: number, y: number, x_direction: number, y_direction: number, time_created: number}[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const sceneRef = useRef<HTMLDivElement | null>(null);

    
    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('cornCount');
        if (storedCount) {
            setCornCount(parseInt(storedCount)); // Set to cookie value if it exists
        } else {
            setCornCount(0); // Set to 0 if the cookie doesn't exist
        }
        setLoading(false); // Set loading to false after cookies are read
    }, [setCornCount]); // Empty dependency array ensures it runs only once after the component mounts

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(400, 400);
        renderer.setClearColor(0x000000, 0);

        if (sceneRef.current) {
            sceneRef.current.appendChild(renderer.domElement);
        }

        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
        camera.position.z = 5;

        const mtlLoader = new MTLLoader();
        mtlLoader.load('../../../models/11548_Ear_Of_Corn_Yellow_V2_l3.mtl', (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('../../../models/11548_Ear_Of_Corn_Yellow_V2_l3.obj', (object) => {
                object.rotation.x = 0; 
                object.rotation.y = 0; 
                object.rotation.z = -Math.PI/2.75;
                object.scale.set(0.3, 0.3, 0.3); 
                scene.add(object);

                const animate = () => {
                    requestAnimationFrame(animate);
                    object.rotation.y += 0.015;
                    renderer.render(scene, camera);
                };
                animate();
            });
        });

        // const total_cps = 

        return () => {
            renderer.dispose();
        };
    }, []);

    const handleClick = (event: React.MouseEvent) => {
        const sound = new Audio("/PopcornPop.mp3");
        sound.load()
        sound.play()
        const newCount = cornCount + 1;
        setCornCount(newCount);
        Cookies.set('cornCount', newCount.toString(), {expires: 365}); 
        
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
    //calculate total CPS
    const [totalCPS, setTotalCPS] = useState(0);

    useEffect(() => {
        const itemIds = items.map((item) => item.id);
        
        // Reading cookies for each item
        itemIds.forEach((itemId) => {
            const storedItem = Cookies.get(`item_id_${itemId}`);
            if (storedItem) {
                const parsedItem = JSON.parse(storedItem);

                // Update items state with the parsed item data
                setItems((prevItems) =>
                    prevItems.map((prevItem) =>
                        prevItem.id === parsedItem.id ? parsedItem : prevItem
                    )
                );
            }
        });
    }, []); // This runs once, when the component first mounts

    // 2. Recalculate total CPS whenever the `items` state changes
    useEffect(() => {
        const newTotalCPS = items.reduce((sum, item) => {
            return sum + (item.count * item.CPS);
        }, 0);

        setTotalCPS(newTotalCPS);  // Set the calculated total CPS
    }, [items]);  // This runs every time `items` changes

    // Update corn count by adding totalCPS every second
    useEffect(() => {
        const interval = setInterval(() => {
            const newCornCount = cornCount + totalCPS;
            setCornCount(newCornCount);
            Cookies.set('cornCount', newCornCount.toString(), { expires: 365 });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [cornCount, totalCPS]);
     
    return (
        <div className="center_align_column text_style corn_click_column ">
        <div className="farm_name_container rounded_corners">
            <h1 className="farm_name">Farm Name</h1>
        </div>
        <div className="corn_info_container">
            <h1 className="corn_count">
                {cornCount !== -1 ? `${cornCount} Corn` : `Loading...`}
            </h1>
            <h3 className="corn_per_second">per second: {totalCPS}</h3>
        </div>
        <div ref={sceneRef} className="corn_3d_box" onClick={handleClick} ></div>
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