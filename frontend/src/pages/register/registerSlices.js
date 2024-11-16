import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserServices } from '../../services/userServices.js'

const initialState = {
    loading: false,
    success: false,
    data: null,
    error: '',
};

export const fetchUser = createAsyncThunk('register', async (d) => {
    return UserServices.register(d).then(data => data)
})
export const registerSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = true 
            state.data = action.payload
            state.error = ''
        })

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.data = null
            state.error = 'action'
        })
    }
})

export default registerSlice.reducer