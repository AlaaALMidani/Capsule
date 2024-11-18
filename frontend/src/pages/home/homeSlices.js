import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostServices } from '../../services/postServices'; // Adjust path as needed

const initialState = {
    loading: false,
    success: false,
    progress: 0, // Add progress
    data: null,
    error: '',
};

export const addPostAsync = createAsyncThunk('post/addPost', async (data, { rejectWithValue, dispatch }) => {
    try {
        return await PostServices.addPost(data, dispatch); // Pass dispatch function
    } catch (error) {
        return rejectWithValue(error.message); // Reject with error message
    }
});


export const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addPostAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
            state.progress = 0; // Reset progress
        });

        builder.addCase(addPostAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
            state.error = '';
            state.progress = 100; // Set progress to 100% on success
        });

        builder.addCase(addPostAsync.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.data = null;
            state.error = action.payload; // Use payload for error message
            state.progress = 0; // Reset progress on failure
        });
    },
});


export default postSlice.reducer;