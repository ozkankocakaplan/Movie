import {
    configureStore, combineReducers, getDefaultMiddleware,
} from '@reduxjs/toolkit'
import { animeReducer } from './features/animeReducer';
import { commentReducer } from './features/commentsReducer';
import { listReducer } from './features/listReducer';
import { mangaReducer } from './features/mangaReducer';
import { modalReducer } from './features/modalReducer'
import { notificationReducer } from './features/notificationReducer';
import { sliderReducer } from './features/sliderReducer';
import { userReducer } from './features/userReducer';

const rootReducers = combineReducers({
    modalReducer,
    userReducer,
    listReducer,
    notificationReducer,
    animeReducer,
    commentReducer,
    sliderReducer,
    mangaReducer
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