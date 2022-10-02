import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
    backgroundBlur: false,
    loginModal: false,
    registerModal: false,
};
export const modalSlice = createSlice({
    name: "modal",
    initialState: { value: INITIAL_STATE },
    reducers: {
        handleOpenBackgroundBlur: (state, action) => {
            state.value.backgroundBlur = action.payload
        },
        handleOpenLoginModal: (state, action) => {
            state.value.loginModal = action.payload
        },
        handleOpenRegisterModal: (state, action) => {
            state.value.registerModal = action.payload
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const { handleOpenBackgroundBlur, handleOpenLoginModal, handleOpenRegisterModal } = modalSlice.actions;