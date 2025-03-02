"use client"
import { useState } from 'react';
import Cookies from 'js-cookie';
export default function ResetButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(true);
  
    try {
      // Create a new Audio object
      const sound = new Audio('/siren.mp3');
      
      // Wait for the audio to load before playing
      await sound.load();
      sound.play(); // Play the sound
      
      alert('ITS A MARTIAN APOCOLAPSE!!!! YOU JUST LOST ALL OF YOUR CORN LOSER!!!!!');
      
      // Clear all cookies
      const cookies = Cookies.get(); // Get all cookies
      Object.keys(cookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
  
      // Force a page reload
      window.location.reload();
    } catch (error) {
      console.error('Error playing the sound:', error);
    }
  };

  return (
    <div className="center-container">
      <button onClick={handleClick} style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
      >DO NOT PRESS</button>
    </div>
  );
}