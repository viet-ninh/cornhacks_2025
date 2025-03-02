'use client';
import { createContext, useContext, useState } from 'react';

interface Item {
  id: number; name: string; cost: number; CPS: number; count: number
}

interface CornItemContex {
  cornCount: number;
  setCornCount: (count: number) => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
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
  const initItems: Item[] = [
    { id: 1, name: "Farm", cost: 1, CPS: 1, count: 0 },
    { id: 2, name: "Robot", cost: 2, CPS: 2, count: 0},
    { id: 3, name: "Space Gangster", cost: 3, CPS: 3, count: 0},
  ];

  const [cornCount, setCornCount] = useState<number>(-1);
  const [items, setItems] = useState<Item[]>(initItems);

  return (
    <CornItemContex.Provider value={{ cornCount, setCornCount, items, setItems }}>
      {children}
    </CornItemContex.Provider>
  );
};