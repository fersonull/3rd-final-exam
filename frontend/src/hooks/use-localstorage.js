export default function useLocalStorage(initialKey, initialValue = null) {

  const get = (key = initialKey) => {
    const item = localStorage.getItem(key);
    if (!item) return initialValue;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Failed to parse localStorage item for key "${key}"`);
      return initialValue;
    }
  };

  const set = (value, key = initialKey) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key = initialKey) => {
    localStorage.removeItem(key);
  };

  return { get, set, remove };
}