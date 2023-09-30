import { createContext } from 'react';

interface IContext {
  popup: string;
  closePopup(): void;
  openPopupChange(): void;
}

export const Context = createContext<IContext | null>(null);
