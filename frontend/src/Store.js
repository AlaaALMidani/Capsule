import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './pages/register/registerSlices.js'
import loginSlice from './pages/login/loginSlices.js'
import postSlice from './slices/postSlices.js'
import  orderSlice  from './slices/orderSlices.js'
const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice,
        post: postSlice,
        order:orderSlice
    },
})

export default store
