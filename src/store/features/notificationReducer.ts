import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../types/Entites";

export const INITIAL_STATE = {
    notifications: [] as Array<Notification>
};
export const notificationSlice = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        setNotification: (state, action) => {
            state.notifications = [...state.notifications, action.payload]
        }
    }
});
export const notificationReducer = notificationSlice.reducer;
export const {
    setNotifications,
    setNotification
} = notificationSlice.actions;