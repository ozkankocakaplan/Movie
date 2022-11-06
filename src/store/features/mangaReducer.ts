import { createSlice } from "@reduxjs/toolkit"
import { MangaEpisodes, MangaFilter, MangaModels } from "../../types/Entites";

const INITIAL_STATE = {
    mangaModel: {} as MangaModels,
    mangaModels: [] as Array<MangaModels>,
    selectedMangaModel: {} as MangaModels,
    selectedEpisodes: [] as Array<MangaEpisodes>,
    selectedEpisode: {} as MangaEpisodes,
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
        },
        setMangaModel: (state, action) => {
            state.mangaModel = action.payload
        },
        setSelectedEpisodes: (state, action) => {
            state.selectedEpisodes = action.payload;
        },
        setSelectedEpisode: (state, action) => {
            state.selectedEpisode = action.payload;
        },
    }
});
export const mangaReducer = mangaSlice.reducer;
export const {
    setMangaModels,
    setSelectedMangaModel,
    setMangaFilter,
    setMangaModel,
    setSelectedEpisodes,
    setSelectedEpisode
} = mangaSlice.actions;