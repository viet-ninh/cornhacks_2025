'use client';
import { createContext, useContext, useState } from 'react';

interface CornItemContex {
    cornCount: number;
    setCornCount: (count: number) => void;
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
  const [cornCount, setCornCount] = useState<number>(0);

  return (
    <CornItemContex.Provider value={{ cornCount, setCornCount }}>
      {children}
    </CornItemContex.Provider>
  );
};