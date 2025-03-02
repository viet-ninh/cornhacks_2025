'use client'

import React, { useState } from "react";
import Image from 'next/image';
import cornLover from "../../../public/cornLover.gif"
import cornhacksGuy from "../../../public/CornhacksGuy.gif"
import { useClickContext } from "./CornItemContext";
const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {final} = useClickContext();
  return (
    <div>
      {/* Info Button */}
      <button className="info-button" onClick={() => setIsModalOpen(true)}>
        i
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "40px", fontWeight: "bold" }}>Information</h2>
            <p>
                Well, it wasn’t supposed to go like this. One minute, I
                 was dreaming about the perfect ear of corn, and the next, I was crash-landing on Mars. No way off,
                  no way home—just me, the red dust, and a stubborn dream. If humanity can put me here, I can sure as hell can figure out 
                  how to grow corn here. Mars may be cold, barren, and unforgiving, but I’ve 
                  got one thing it doesn’t—an undying love for corn.
            </p>
            <Image src={cornLover} alt="Animated GIF"/>
          </div>
        </div>
      )}
      {final && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: "40px", fontWeight: "bold" }}>Congratulations you win!</h2>
            <Image src={cornhacksGuy} alt="Animated GIF"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
