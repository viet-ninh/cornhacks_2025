"use client"
import { useState } from 'react';
import Cookies from 'js-cookie';
export default function ResetButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    alert('ITS A MARTIAN APOCOLAPSE!!!! YOU JUST LOST ALL OF YOUR CORN LOSER!!!!!');

    const cookies = Cookies.get(); // Get all cookies
    Object.keys(cookies).forEach((cookieName) => {
    Cookies.remove(cookieName);
    });
    window.location.reload();
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