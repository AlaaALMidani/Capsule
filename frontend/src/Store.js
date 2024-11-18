import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './pages/register/registerSlices.js'
import loginSlice from './pages/login/loginSlices.js'
import postSlice from './pages/home/homeSlices.js'
const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice,
        post: postSlice,
    },
})

export default store
