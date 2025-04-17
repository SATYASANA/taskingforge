import {configureStore} from '@reduxjs/toolkit'

import authSliceReducer from "./Slices/AuthSlice"
import taskSliceReducer from "./Slices/TaskSlice"
export const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        task:taskSliceReducer
    }
})