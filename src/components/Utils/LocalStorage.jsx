// Utility to fetch items from localStorage
export function getItemsFromLocalStorage(key, defaultValue = []) {
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : defaultValue;
  }
  
  // Utility to save items to localStorage
  export function saveItemsToLocalStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }
  