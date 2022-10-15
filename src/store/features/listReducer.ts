import { createSlice } from "@reduxjs/toolkit";
import { AnimeAndMangaModels, AnimeList, AnimeListModels, AnimeStatus, MangaList, MangaListModels, MangaStatus, Type, UserList, UserListContents } from "../../types/Entites";

export const INITIAL_STATE = {
    selectedList: {} as UserList,
    selectedAnimeListType: null,
    selectedMangaListType: null,
    searchListResult: [] as Array<AnimeAndMangaModels>,
    selectedAnimeEpisodes: [] as Array<AnimeList>,
    selectedMangaEpisodes: [] as Array<MangaList>,
    editAnimeList: {} as AnimeListModels,
    editMangaList: {} as MangaListModels,
    selectedUserListContents: [] as Array<UserListContents>
};
export const listSlice = createSlice({
    name: 'list',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedList: (state, action) => {
            state.selectedList = action.payload;
        },
        setSelectedAnimeListType: (state, action) => {
            state.selectedAnimeListType = action.payload;
        },
        setSelectedMangaListType: (state, action) => {
            state.selectedMangaListType = action.payload;
        },
        setSearchListResult: (state, action) => {
            state.searchListResult = action.payload;
        },
        setSelectedAnimeEpisode: (state, action) => {
            state.selectedAnimeEpisodes = [...state.selectedAnimeEpisodes, action.payload];
        },
        setSelectedMangaEpisode: (state, action) => {
            state.selectedMangaEpisodes = [...state.selectedMangaEpisodes, action.payload];
        },
        setSelectedAnimeEpisodes: (state, action) => {
            state.selectedAnimeEpisodes = action.payload;
        },
        setSelectedMangaEpisodes: (state, action) => {
            state.selectedMangaEpisodes = action.payload;
        },
        setEditAnimeList: (state, action) => {
            state.editAnimeList = action.payload
        },
        setEditMangaList: (state, action) => {
            state.editMangaList = action.payload
        },
        setSelectedUserListContents: (state, action) => {
            state.selectedUserListContents = action.payload
        },
        setselectedUserListContent: (state, action) => {
            state.selectedUserListContents = [...state.selectedUserListContents, action.payload]
        }
    },
});
export const listReducer = listSlice.reducer;
export const {
    setSelectedList,
    setSelectedAnimeListType,
    setSelectedMangaListType,
    setSearchListResult,
    setSelectedAnimeEpisode,
    setSelectedMangaEpisode,
    setSelectedAnimeEpisodes,
    setSelectedMangaEpisodes,
    setEditAnimeList,
    setEditMangaList,
    setSelectedUserListContents,
    setselectedUserListContent

} = listSlice.actions;