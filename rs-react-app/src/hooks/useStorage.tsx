export default function useStorage(key: string) {
  function getItem() {
    const item = localStorage.getItem(key);
    if (item === null) {
      localStorage.setItem(key, '');
      return '';
    } else {
      return item;
    }
  }
  function setItem(value: string): boolean {
    const item = localStorage.getItem(key);
    if (value !== item) {
      localStorage.setItem(key, value);
      return true;
    } else {
      return false;
    }
  }

  return { getItem, setItem };
}
