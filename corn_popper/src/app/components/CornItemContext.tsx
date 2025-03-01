'use client';
import { createContext, useContext, useState } from 'react';

interface CornItemContex {
    clickCount: number;
    setClickCount: (count: number) => void;
  }

const CornItemContex = createContext<CornItemContex | undefined>(undefined);

export const useClickContext = () => {
  const context = useContext(CornItemContex);
  if (!context) {
    throw new Error('useClickContext must be used within a ClickProvider');
  }
  return context;
};

export const ClickProvider = ({ children }: { children: React.ReactNode }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  return (
    <CornItemContex.Provider value={{ clickCount, setClickCount }}>
      {children}
    </CornItemContex.Provider>
  );
};