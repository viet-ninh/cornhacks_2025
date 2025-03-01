'use client'
import "./../globals.css";
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useClickContext } from "./CornItemContext";


export default function CornClick() {

    const { clickCount, setClickCount } = useClickContext();
    const [clickedPositions, setClickedPositions] = useState<{x: number, y: number, x_direction: number, y_direction: number, time_created: number}[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const sceneRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Read the cookie after the component has mounted
        const storedCount = Cookies.get('clickCount');
        if (storedCount) {
            setClickCount(parseInt(storedCount));
        }
        setLoading(false); // Set loading to false after cookies are read
    }, [setClickCount]); // Empty dependency array ensures it runs only once after the component mounts

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

        return () => {
            renderer.dispose();
        };
    }, []);

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