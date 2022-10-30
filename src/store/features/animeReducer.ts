import { createSlice } from "@reduxjs/toolkit"
import { AnimeEpisodes, AnimeFilter, AnimeModels, Comments, Episodes, ReviewsModels } from "../../types/Entites";


export const INITIAL_STATE = {
    animeModels: [] as Array<AnimeModels>,
    animeModel: {} as AnimeModels,
    selectedEpisodes: [] as Array<Episodes>,
    selectedEpisode: {} as AnimeEpisodes,
    selectedReview: {} as ReviewsModels,
    selectedAnimeModel: {} as AnimeModels,
    animeFilter: { category: { id: 0 }, point: 1, order: null, type: 0 } as AnimeFilter
}
export const animeSlice = createSlice({
    name: 'animeSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setAnimeModel: (state, action) => {
            state.animeModel = action.payload;
        },
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
        },
        setSelectedAnimeModel: (state, action) => {
            state.selectedAnimeModel = action.payload;
        },
        setAnimeFilter: (state, action) => {
            state.animeFilter = action.payload;
        }
    }
});
export const animeReducer = animeSlice.reducer;
export const {
    setAnimeModel,
    setAnimeModels,
    setSelectedEpisodes,
    setSelectedEpisode,
    setSelectedReview,
    setSelectedAnimeModel,
    setAnimeFilter
} = animeSlice.actions;