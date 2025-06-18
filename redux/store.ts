import { configureStore } from '@reduxjs/toolkit'
import medicinesReducer from './medicinesSlice'

export const store = configureStore({
    reducer: {
        medicines: medicinesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>