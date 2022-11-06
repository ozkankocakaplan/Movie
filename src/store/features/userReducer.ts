import { createSlice } from "@reduxjs/toolkit";
import { ContentComplaint, Rosette, UserFullModels, UserMessageModel, Users } from "../../types/Entites";
import { HubConnection } from '@aspnet/signalr';
export const INITIAL_STATE = {
    user: {} as Users,
    viewUser: {} as UserFullModels,
    isUserBlock: false,
    selectedRosette: {} as Rosette,
    contentComplaint: {} as ContentComplaint,
    messageUser: [] as Array<UserMessageModel>,
    signalR: {} as HubConnection,
    selectedImage: '' as string
};
export const userSlice = createSlice({
    name: 'user',
    initialState: { value: INITIAL_STATE },
    reducers: {
        setUser: (state, action) => {
            state.value.user = action.payload;
        },
        setViewUser: (state, action) => {
            state.value.viewUser = action.payload;
        },
        setIsUserBlock: (state, action) => {
            state.value.isUserBlock = action.payload
        },
        setSelectedRosette: (state, action) => {
            state.value.selectedRosette = action.payload;
        },
        setContentComplaint: (state, action) => {
            state.value.contentComplaint = action.payload;
        },
        setMessageUsers: (state, action) => {
            state.value.messageUser = action.payload;
        },
        setMessageUser: (state, action) => {
            state.value.messageUser = [...state.value.messageUser, action.payload];
        },
        setSignalR: (state, action) => {
            state.value.signalR = action.payload
        },
        setSelectedImage: (state, action) => {
            state.value.selectedImage = action.payload
        }
    }
});
export const userReducer = userSlice.reducer;
export const {
    setUser,
    setViewUser,
    setIsUserBlock,
    setSelectedRosette,
    setContentComplaint,
    setMessageUsers,
    setSignalR,
    setMessageUser,
    setSelectedImage
} = userSlice.actions;