import { createSlice } from "@reduxjs/toolkit";

// Initial state for checked items
const initialState = [];

// Create a slice of the store
const checkedSlice = createSlice({
  name: "checked",
  initialState,
  reducers: {
    // Action to add a product to the checked list
    addToChecked: (state, action) => {
      state.push(action.payload);
    },
    // Action to remove a product from the checked list
    removeFromChecked: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    // Action to set the checked list (e.g., from localStorage)
    setChecked: (state, action) => {
      return action.payload;
    },
  },
});

// Export the actions
export const { addToChecked, removeFromChecked, setChecked } = checkedSlice.actions;

// Export the reducer to be included in the store
export default checkedSlice.reducer;
