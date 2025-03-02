"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ResetButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false); // To ensure code runs only on the client side

  useEffect(() => {
    setIsClient(true); // Ensure this code runs on the client side only
  }, []);

  const handleClick = async () => {

    try {
      // Create a new Audio object
      const sound = new Audio("/Siren.mp3");

      // Wait for the audio to load before playing
      await sound.load();
      sound.play(); // Play the sound

      // Open the modal instead of alert
      setModalOpen(true);

      // Clear all cookies
      const cookies = Cookies.get(); // Get all cookies
      Object.keys(cookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });

      // Force a page reload after closing the modal
    } catch (error) {
      console.error("Error playing the sound:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.reload(); // Reload the page when modal is closed
  };

  if (!isClient) {
    return null; // Prevent server-side rendering
  }

  return (
    <div className="center-container">
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        DO NOT PRESS
      </button>

      {modalOpen && (
        <div style={overlayStyles}>
          <div style={modalStyles} onClick={handleCloseModal}>
            <h2>ITS A MARTIAN APOCALYPSE!!!!</h2>
            <p>You just lost all of your corn, loser!!!</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Define styles with specific types for React inline styles
const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles: React.CSSProperties = {
  backgroundColor: "red",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "300px",
  textAlign: "center",
};

export default ResetButton;
