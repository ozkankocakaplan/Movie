import { createSlice } from "@reduxjs/toolkit"
import { AnimeEpisodes, AnimeModels, Comments, Episodes, ReviewsModels } from "../../types/Entites";

export const INITIAL_STATE = {
    animeModels: {} as AnimeModels,
    selectedEpisodes: [] as Array<Episodes>,
    selectedEpisode: {} as AnimeEpisodes,
    selectedReview: {} as ReviewsModels,
}
export const animeSlice = createSlice({
    name: 'animeSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setAnimeModels: (state, action) => {
            state.animeModels = action.payload;
        },
        setSelectedEpisodes: (state, action) => {
            state.selectedEpisodes = action.payload;
        },
        setSelectedEpisode: (state, action) => {
            state.selectedEpisode = action.payload;
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload;
        }
    }
});
export const animeReducer = animeSlice.reducer;
export const {
    setAnimeModels,
    setSelectedEpisodes,
    setSelectedEpisode,
    setSelectedReview,
} = animeSlice.actions;