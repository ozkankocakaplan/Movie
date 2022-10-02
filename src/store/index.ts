import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { modalReducer } from './features/modalReducer'

const rootReducers = combineReducers({
    modalReducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducers
    })
};
export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>