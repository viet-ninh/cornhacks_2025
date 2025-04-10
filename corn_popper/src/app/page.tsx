"use client";
import CornClick from './components/CornClick'
import ItemList from './components/ItemList/ItemList';
import { ClickProvider } from './components/CornItemContext';
import ResetButton from './components/ResetButton';
import PassiveWorkers from './components/PassiveWorkers';
import InfoButton from './components/InfoButton';
import { useEffect, useRef } from 'react';

import './globals.css'

export default function Home() {


  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
      if (!audioRef.current) {
        const audio = new Audio('/UNLSong.mp3');
        audio.loop = true;
        audio.volume = 0.25;
        audio.load();
        audio.play();
        audioRef.current = audio;
      }
  
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }, []); // Empty dependency array ensures this effect runs only once
  return (
    <ClickProvider>
      <div className="flex_container">
        <div className="flex_item overflow: 'hidden'">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
            <ResetButton/>
            <InfoButton/>
          </div>
          <CornClick/>
        </div>
        <div className="middle_flex_item">
          <PassiveWorkers/>
        </div>
        <div className="flex_item" >
          <div className="h-full overflow-y-auto">
            <ItemList />
          </div>
        </div>
      </div>
    </ClickProvider>
  );
}
