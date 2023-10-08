export const getDataLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export function setDataLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
