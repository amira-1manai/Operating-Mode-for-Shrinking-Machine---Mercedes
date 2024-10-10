import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch product statistics
export const fetchProductStats = createAsyncThunk(
  'productStats/fetchProductStats',
  async () => {
    const response = await axios.get('/api/products/stats');
    return response.data;
  }
);

const productStatsSlice = createSlice({
  name: 'productStats',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productStatsSlice.reducer;
