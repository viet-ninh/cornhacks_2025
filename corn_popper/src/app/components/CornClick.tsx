'use client'
import "./../globals.css";
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { MTLLoader } from 'three-stdlib';
import { useClickContext } from "./CornItemContext";
import * as Helpers from '../helpers';


export default function CornClick() {

    const { cornCount, setCornCount, items, setItems, reset, clickMultiplier, setClickMultiplier } = useClickContext();
    const [clickedPositions, setClickedPositions] = useState<{ x: number, y: number, x_direction: number, y_direction: number, time_created: number }[]>([])
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const [totalCPS, setTotalCPS] = useState<number>(0);

    // Corn counter
    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('cornCount');
        if (storedCount) {
            setCornCount(parseInt(storedCount)); // Set to cookie value if it exists
        } else {
            setCornCount(0); // Set to 0 if the cookie doesn't exist
        }
    }, [setCornCount]); // Empty dependency array ensures it runs only once after the component mounts

    // Corn animation
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
                object.rotation.z = -Math.PI / 2.75;
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
    // Farm Name 
    const [farmName, setFarmName] = useState<string>("");

    useEffect(() => {
        // Check if the 'farmName' cookie exists
        const storedName = Cookies.get('farmName');

        if (!storedName) {
            // If the cookie doesn't exist, create it and set the value to 'Farm Name'
            Cookies.set('farmName', 'Farm Name ✏️', { expires: 365 });
            setFarmName('Farm Name ✏️'); // Update the state
        } else {
            // If the cookie exists, use its value
            setFarmName(storedName);
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value;
        Cookies.set('farmName', currentValue, { expires: 365 });
        setFarmName(currentValue);
        
    }

    // handles corn click
    const handleCornClick = (event: React.MouseEvent) => {
        const sound = new Audio("/PopcornPop.mp3");
        sound.load()
        sound.play()
        const newCount = cornCount + clickMultiplier;
        setCornCount(newCount);
        Cookies.set('cornCount', newCount.toString(), { expires: 365 });

        // Get random number -1 to 1
        const x_direction = (Math.random() * 2) - 1
        const y_direction = (Math.random() * 2) - 1

        const newClick = { x: event.clientX, y: event.clientY, x_direction: x_direction, y_direction: y_direction, time_created: Date.now() };
        setClickedPositions((prevPositions) => [...prevPositions, newClick]);
        // Set a timeout to remove the text after 1 second
        setTimeout(() => {
            setClickedPositions((prevPositions) => prevPositions.filter(click => click !== newClick));
        }, 1000);
    };

    // handles click multiplier button
    const handleClickMultiplier = () => {
        if (cornCount >= clickMultiplier * 500) {
            const newMultiplier = clickMultiplier * 2;
            setClickMultiplier(newMultiplier);
            Cookies.set(`click_multiplier`, newMultiplier.toString(), { expires: 365 });

            const newAmount = cornCount - clickMultiplier * 500;
            setCornCount(newAmount); // Deduct the cost from cornCount
            Cookies.set('cornCount', newAmount.toString(), { expires: 365 });
        }
        else {
            console.log('Not enough cookies to buy this item.');
        }
    }

    // populate items
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
    }, []);

    // Recalculate total CPS whenever the `items` state changes
    useEffect(() => {
        const newTotalCPS = items.reduce((sum, item) => {
            return sum + (item.count * item.CPS);
        }, 0);

        setTotalCPS(newTotalCPS);  // Set the calculated total CPS
    }, [items]);  // This runs every time `items` changes

    // Update corn count by adding totalCPS every second
    useEffect(() => {
        if (reset) return;

        const interval = setInterval(() => {
            setCornCount((prevCount) => {
                const newCornCount = prevCount + totalCPS;
                Cookies.set('cornCount', newCornCount.toString(), { expires: 365 });
                return newCornCount;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [totalCPS, reset]); // Remove cornCount from dependencies

    // Update click multiplier
    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedClickCount = Cookies.get('click_multiplier');
        if (storedClickCount) {
            setClickMultiplier(parseInt(storedClickCount)); // Set to cookie value if it exists
        } else {
            setClickMultiplier(1); // Set to 0 if the cookie doesn't exist
        }
    }, [setClickMultiplier]); // Empty dependency array ensures it runs only once after the component mounts


    const buttonStyle = cornCount >= clickMultiplier * 500
        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
        : "bg-gray-500 hover:bg-yellow-600 text-gray-300 cursor-not-allowed opacity-50";

    return (
        <div>
            <div className="center_align_column text_style corn_click_column ">
                <div className="farm_name_container rounded_corners">
                    <input type="text" className="farm_name" onChange={handleChange} defaultValue={farmName} maxLength={12}/>
                </div>
                <div className="corn_info_container">
                    <h1 className="corn_count">
                        {cornCount !== -1 ? `${Helpers.formatNumber(cornCount)} Corn` : `Loading...`}
                    </h1>
                    <h3 className="corn_per_second">per second: {Helpers.formatNumber(totalCPS)}</h3>
                </div>
                <div ref={sceneRef} className="corn_3d_box" onClick={handleCornClick} ></div>
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
                        +{clickMultiplier} 🌽Corn
                    </div>
                ))}
            </div>
            <div>
                {/* INSERT BUTTON to run handleClickMultiplier */}
                <div className="flex justify-center">
                    <button
                        onClick={handleClickMultiplier}
                        // className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
                        className={`item_button block rounded-lg p-3 ${buttonStyle} transition-all duration-300`}
                    >
                        <div style={{ flex: 1 }}>
                            <div>
                                Upgrade 🖱️ (x{clickMultiplier})
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                🌽{Helpers.formatNumber(clickMultiplier * 500)}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}