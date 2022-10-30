import { createSlice } from "@reduxjs/toolkit"
import { MangaFilter, MangaModels } from "../../types/Entites";

const INITIAL_STATE = {
    mangaModels: [] as Array<MangaModels>,
    selectedMangaModel: {} as MangaModels,
    mangaFilter: { category: { id: 0 }, point: 1, order: null, type: 0 } as MangaFilter
}
const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setMangaModels: (state, action) => {
            state.mangaModels = action.payload
        },
        setSelectedMangaModel: (state, action) => {
            state.selectedMangaModel = action.payload
        },
        setMangaFilter: (state, action) => {
            state.mangaFilter = action.payload;
        }
    }
});
export const mangaReducer = mangaSlice.reducer;
export const {
    setMangaModels,
    setSelectedMangaModel,
    setMangaFilter
} = mangaSlice.actions;