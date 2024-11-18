import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserServices } from '../../services/userServices.js'

const initialState = {
    loading: false,
    success: false,
    data: null,
    error: '',
};

export const login = createAsyncThunk('login/', async (data) => {
    return UserServices.login(data).then(data => data)
})



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(login.pending, (state) => {
            state.loading = true
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.data = action.payload
            state.error = ''
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.data = null
            state.error = 'action'
        })
    }
})

export default loginSlice.reducer