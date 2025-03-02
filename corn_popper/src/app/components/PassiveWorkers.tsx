'use client'
import { useClickContext } from "./CornItemContext";

export default function PassiveWorkers() {
    
    const { items } = useClickContext();

    return (
        <div>
            {items.filter(item => item.count > 0).map(item =>
                <div key={item.id} className="passive_worker_card">
                    <div className="flex_container">
                        <h1>{item.name}</h1>
                        <h1 className="right_align">{item.count}</h1>
                    </div>
                </div>
            )}
        </div>
    );
}