import { createContext } from 'react';

interface IContext {
  popup: string;
  setPopup(value: string): void;
}

export const Context = createContext<IContext | null>(null);
