import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostServices } from '../services/postServices'; // Adjust path as needed

const initialState = {
    loading: false,
    success: false,
    progress: 0,
    data: null,
    error: '',
    myPosts: null,
};

export const addPostAsync = createAsyncThunk('post/addPost', async (data, { rejectWithValue, dispatch }) => {
    try {
        return await PostServices.addPost(data, dispatch); // Pass dispatch function
    } catch (error) {
        return rejectWithValue(error.message); // Reject with error message
    }
});

export const getMyPosts = createAsyncThunk('post/getMyPosts', async () => {
    return await PostServices.getMyPosts();
});

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    return await PostServices.getAllPosts();
});
export const postSlice = createSlice({
    name: 'post',
    initialState,
    uploadProgress: (state, action) => { // This line defines the action creator
        state.progress = action.payload;
    },
    extraReducers: (builder) => {

        //add post 
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



        //get my posts 
        builder.addCase(getMyPosts.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(getMyPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.myPosts = action.payload; // Store fetched posts here
            state.error = '';
        });
        builder.addCase(getMyPosts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.myPosts = null; // Clear posts on error
        });

        //get all posts
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.allPosts = action.payload;
            state.error = '';
        });
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.allPosts = null;
        });


    },
});

export const { uploadProgress } = postSlice.actions;
export default postSlice.reducer;