import {
    configureStore, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit'
import { listReducer } from './features/listReducer';
import { modalReducer } from './features/modalReducer'
import { userReducer } from './features/userReducer';

const rootReducers = combineReducers({
    modalReducer,
    userReducer,
    listReducer
});
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) => customizedMiddleware,
    })
};

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>