import { createSlice } from "@reduxjs/toolkit";
import { Rosette, UserFullModels, Users } from "../../types/Entites";

export const INITIAL_STATE = {
    user: {} as Users,
    viewUser: {} as UserFullModels,
    isUserBlock: false,
    selectedRosette: {} as Rosette
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
        }
    }
});
export const userReducer = userSlice.reducer;
export const {
    setUser,
    setViewUser,
    setIsUserBlock,
    setSelectedRosette
} = userSlice.actions;