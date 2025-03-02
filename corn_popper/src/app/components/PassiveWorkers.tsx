'use client'
import { useClickContext } from "./CornItemContext";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PassiveWorkers() {
    
    const { items } = useClickContext();
    
    // Position tuple: [left, top]
    type Position = [string, string];

    const [spritePositions, setSpritePositions] = useState<Record<number, Position[]>>({});

    useEffect(() => {
        setSpritePositions((prevPositions: Record<number, Position[]>) => {
            const newPositions: Record<number, Position[]> = { ...prevPositions };
            items.forEach(item => {
                const currentPositions: Position[] = newPositions[item.id] ?? [];
                // If the item is new, give it a random position
                if (item.count > currentPositions.length) {
                    const newSpritePositions: Position[] = Array.from({ length: item.count - currentPositions.length }, () => [
                        `${Math.floor(Math.random() * 80) + 10}%`, // Random number between 10% to 90% to avoid placing on edge of box
                        `${Math.floor(Math.random() * 80) + 10}%`,
                    ]);
                    newPositions[item.id] = [...currentPositions, ...newSpritePositions];
                }
            });
            return newPositions;
        });
    }, [items]);
    

    return (
        <div className="passive_worker_column">
            {items.filter(item => item.count > 0).map(item =>
            // Background of each container
                <div key={item.id} className="passive_worker_card">
                   <div className="worker_card_background">
                        <Image
                            src={`/passive-worker/background-${item.id}.png`}
                            alt={`container for ${item.name}`}
                            layout="fill"
                        />
                        {/* Sprites within each worker card */}
                        {spritePositions[item.id]?.map((position, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="worker_card_sprite"
                                style={{
                                    left: position[0],
                                    top: position[1],
                            }}>
                            <Image
                                src={`/passive-worker/sprite-${item.id}.png`}
                                alt='sprite'
                                layout="fill"
                            />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}