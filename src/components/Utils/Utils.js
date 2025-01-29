export const formatTitle = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };
  