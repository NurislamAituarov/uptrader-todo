import { IItemTask } from '@/types';

export const getDataLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export function setDataLocalStorage(key: string, value: IItemTask[]) {
  localStorage.setItem(key, JSON.stringify(value));
}
