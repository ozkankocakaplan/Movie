import { createSlice } from "@reduxjs/toolkit"
import { HomeSlider } from "../../types/Entites";

const INITIAL_STATE = {
    sliders: [] as Array<HomeSlider>,
    selectedIndex: 0
}
const sliderSlice = createSlice({
    name: 'sliderSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setSliders: (state, action) => {
            state.sliders = action.payload;
        },
        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload
        }
    }
});
export const sliderReducer = sliderSlice.reducer;
export const {
    setSliders,
    setSelectedIndex
} = sliderSlice.actions;