import { configureStore } from '@reduxjs/toolkit'
import registerSlice from '../pages/register/registerSlices.js'
import loginSlice from '../pages/login/loginSlices.js'

const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice
    },
})

export default store
