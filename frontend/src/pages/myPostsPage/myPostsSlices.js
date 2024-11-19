// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { PostServices } from '../../services/postServices'; // Adjust path as needed

// const initialState = {
//     loading: false,
//     success: false,
//     data: null,
//     error: '', 
// };

// export const getMyPosts = createAsyncThunk('myPosts', async () => {
//         return await PostServices.getMyPosts();

// });


// export const myPostsSlice = createSlice({
//     name: 'myPosts',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(getMyPosts.pending, (state) => {
//             state.loading = true;
//             state.success = false;
//             state.error = '';
//         });

//         builder.addCase(getMyPosts.fulfilled, (state, action) => {
//             state.loading = false;
//             state.success = true;
//             state.data = action.payload;
//             state.error = '';
//         });

//         builder.addCase(getMyPosts.rejected, (state, action) => {
//             state.loading = false;
//             state.success = false;
//             state.data = null;
//             state.error = action.payload;
//         });
//     },
// });
        
// export default myPostsSlice.reducer;