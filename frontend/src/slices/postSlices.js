import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostServices } from '../services/postServices'; // Adjust path as needed

const initialState = {
    addPost: { loading: false, success: false, error: '', data: null },
    getMyPosts: { loading: false, success: false, error: '', data: null },
    getAllPosts: { loading: false, success: false, error: '', data: null },
    progress: 0,
};

export const addPostAsync = createAsyncThunk('post/addPost', async (data, { rejectWithValue, dispatch }) => {
    try {
        return await PostServices.addPost(data, dispatch); // Pass dispatch function
    } catch (error) {
        return rejectWithValue(error.message); // Reject with error message
    }
});

export const getMyPostsAsync = createAsyncThunk('post/getMyPosts', async () => {
    return await PostServices.getMyPosts();
});

export const getAllPostsAsync = createAsyncThunk('post/getAllPosts', async () => {
    return await PostServices.getAllPosts();
});
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      uploadProgress: (state, action) => {
        state.progress = action.payload;
      },
    },
    extraReducers: (builder) => {
      const handleAsyncCases = (actionType, targetKey) => {
        builder
          .addCase(actionType.pending, (state) => {
            state[targetKey].loading = true;
            state[targetKey].error = '';
          })
          .addCase(actionType.fulfilled, (state, action) => {
            state[targetKey].loading = false;
            state[targetKey].success = true;
            state[targetKey].data = action.payload;
          })
          .addCase(actionType.rejected, (state, action) => {
            state[targetKey].loading = false;
            state[targetKey].success = false;
            state[targetKey].error = action.payload;
            state[targetKey].data = null;
          });
      };
  
      handleAsyncCases(addPostAsync, 'addPost');
      handleAsyncCases(getMyPostsAsync, 'getMyPosts');
      handleAsyncCases(getAllPostsAsync, 'getAllPosts');
    },
  });

export const { uploadProgress } = postSlice.actions;
export default postSlice.reducer;