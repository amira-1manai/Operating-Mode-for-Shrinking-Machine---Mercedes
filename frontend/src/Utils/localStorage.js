// src/Utils/localStorage.js

// Add a product to localStorage
export const addCheckedToLocalStorage = (product) => {
  const checkedItems = getCheckedFromLocalStorage();
  if (!checkedItems.some((p) => p._id === product._id)) {
    checkedItems.push(product);
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }
};

// Remove a product from localStorage
export const removeCheckedFromLocalStorage = (productId) => {
  const checkedItems = getCheckedFromLocalStorage();
  const updatedCheckedItems = checkedItems.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));
};

// Retrieve checked items from localStorage
export const getCheckedFromLocalStorage = () => {
  const checkedItemsJSON = localStorage.getItem("checkedItems");
  return checkedItemsJSON ? JSON.parse(checkedItemsJSON) : [];
};
