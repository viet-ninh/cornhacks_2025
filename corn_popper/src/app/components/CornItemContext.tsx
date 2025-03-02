'use client';
import { createContext, useContext, useState } from 'react';
import * as Helpers from '../helpers';

interface Item {
  id: number; name: string; cost: number; CPS: number; count: number
}

interface CornItemContex {
  cornCount: number;
  setCornCount: React.Dispatch<React.SetStateAction<number>>;  
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  reset: boolean;
  setReset: (reset: boolean) => void;
  final: boolean;
  setFinal: (final: boolean) => void;
  clickMultiplier: number;
  setClickMultiplier: (count: number) => void;
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
    { id: 1, name: "Earth Soil", cost: 10, CPS: 1, count: 0 },
    { id: 2, name: "Seeds", cost: Helpers.getCost(2), CPS: 5, count: 0},
    { id: 3, name: "Pixie Dust", cost: Helpers.getCost(3), CPS: 21, count: 0},
    { id: 4, name: "Equipment", cost: Helpers.getCost(4), CPS: 89, count: 0},
    { id: 5, name: "Martians", cost: Helpers.getCost(5), CPS: 377, count: 0},
    { id: 6, name: "Rovers", cost: Helpers.getCost(6), CPS: 987, count: 0},
    { id: 7, name: "Robots", cost: Helpers.getCost(7), CPS: 2584, count: 0},
    { id: 8, name: "Mechatronics", cost: Helpers.getCost(8), CPS: 6765, count: 0},
    { id: 9, name: "Corn fueled Rocket", cost: Helpers.getCost(9), CPS: 17711, count: 0},
    { id: 10, name: "Herbie", cost: Helpers.getCost(10), CPS: 46368, count: 0},
    { id: 11, name: "CornHacks Guy", cost: Helpers.getCost(11), CPS: 121393, count: 0},
  ]

  const [cornCount, setCornCount] = useState<number>(-1);
  const [items, setItems] = useState<Item[]>(initItems);
  const [reset, setReset] = useState<boolean>(false);
  const [final, setFinal] = useState<boolean>(false);
  const [clickMultiplier, setClickMultiplier] = useState<number>(1);

  return (
    <CornItemContex.Provider value={{ cornCount, setCornCount, items, setItems, reset, setReset, clickMultiplier, setClickMultiplier, final, setFinal }}>
      {children}
    </CornItemContex.Provider>
  );
};