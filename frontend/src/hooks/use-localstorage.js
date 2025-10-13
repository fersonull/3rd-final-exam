export default function useLocalStorage(initialKey, initialValue = null) {

  const get = (key = initialKey) => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialValue;
  };

  const set = (value, key = initialKey) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key = initialKey) => {
    localStorage.removeItem(key);
  };

  return { get, set, remove };
}