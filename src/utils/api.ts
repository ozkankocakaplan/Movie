import axios from 'axios';
import { Anime, AnimeAndMangaModels, AnimeList, ComplaintList, FanArt, Manga, MangaList, UserBlockList, UserEmailVertification, UserList, UserListContents, UserModel, Users } from '../types/Entites';
import ServiceResponse from '../types/ServiceResponse';
export const baseUrl = "http://192.168.2.175:37323";
export default function api() {
    const userLocal = localStorage.getItem('user');
    var user: UserModel = {} as UserModel;
    if (userLocal) {
        user = JSON.parse(userLocal);
    }
    return axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': user != null ? 'bearer ' + user.token : "",
        }
    })
}
export const postLogin = async (userName?: string, password?: string) => {
    return await api().post<ServiceResponse<UserModel>>("/login/" + userName + "/" + password);
}

export const getSearchAnime = async (search: string) => {
    return await api().get<ServiceResponse<Anime>>("/getSearchAnime/" + search);
}
export const postAgainUserEmailVertification = async (email: string) => {
    return await api().post<ServiceResponse<UserEmailVertification | Users>>("/againUserEmailVertification/" + email);
}
export const postAddUser = async (entity: Users, code: string) => {
    return await api().post<ServiceResponse<Users>>("/addUser/" + code, entity);
}
export const getUser = async () => {
    return await api().get<ServiceResponse<Users>>("/getMe");
}
export const getUserBySeoUrl = async (seoUrl: string) => {
    return await api().get<ServiceResponse<UserModel>>("/getUserBySeoUrl/" + seoUrl);
}
export const putUserInfo = async (nameSurname: string, username: string) => {
    return await api().put("/updateUserInfo/" + nameSurname + "/" + username);
}
export const putEmailChange = async (email: string, code: string) => {
    return await api().put("/updateEmailChange/" + email + "/" + code);
}
export const putPassword = async (currentPassword: string, newPassword: string) => {
    return await api().put("/updatePassword/" + currentPassword + "/" + newPassword);
}
export const deleteFanArt = async (id: number) => {
    return await api().delete<ServiceResponse<FanArt>>("/deleteFanArt/" + id);
}
export const postUserList = async (entity: UserList) => {
    return await api().post<ServiceResponse<UserList>>("/addUserList", entity);
}
export const putUserList = async (entity: UserList) => {
    return await api().put<ServiceResponse<UserList>>("/updateUserList", entity);
}
export const deleteUserList = async (id: number) => {
    return await api().delete<ServiceResponse<UserList>>("/deleteUserList/" + id);
}
export const getSearchAnimeAndManga = async (text: string) => {
    return await api().get<ServiceResponse<AnimeAndMangaModels>>("/getSearchAnimeAndManga/" + text);
}
export const getUserBlockList = async (userID: number, blockID: number) => {
    return await api().get<ServiceResponse<UserBlockList>>("/getUserBlockList/" + userID + "/" + blockID);
}
export const postUserBlockList = async (entity: UserBlockList) => {
    return await api().post<ServiceResponse<UserBlockList>>("/addUserBlockList", entity);
}
export const deleteUserBlockList = async (blockID: number) => {
    return await api().delete<ServiceResponse<UserBlockList>>("/deleteUserBlockList/" + blockID);
}
export const postComplaintList = async (entity: ComplaintList) => {
    return await api().post<ServiceResponse<UserBlockList>>("/addComplaint", entity);
}
export const postAnimeLists = async (entity: Array<AnimeList>) => {
    return await api().post<ServiceResponse<AnimeList>>("/addAnimeLists", entity);
}
export const postAnimeList = async (entity: AnimeList) => {
    return await api().post<ServiceResponse<AnimeList>>("/addAnimeList", entity);
}
export const postMangaLists = async (entity: Array<MangaList>) => {
    return await api().post<ServiceResponse<MangaList>>("/addMangaLists", entity);
}
export const postMangaList = async (entity: MangaList) => {
    return await api().post<ServiceResponse<MangaList>>("/addMangaList", entity);
}
export const deleteAnimeList = async (id: number) => {
    return await api().delete<ServiceResponse<AnimeList>>("/deleteAnimeList/" + id);
}
export const deleteMangaList = async (id: number) => {
    return await api().delete<ServiceResponse<MangaList>>("/deleteMangaList/" + id);
}
export const postUserListContents = async (entity: Array<UserListContents>) => {
    return await api().post<ServiceResponse<UserListContents>>("/addUserListContents", entity);
}
export const deleteUserListContent = async (id: number) => {
    return await api().delete<ServiceResponse<UserListContents>>("/deleteUserListContent/" + id);
}
export const postUserListContent = async (entity: UserListContents) => {
    return await api().post<ServiceResponse<UserListContents>>("/deleteUserListContent", entity);
}