import axios from 'axios';
import { Anime, AnimeAndMangaModels, AnimeList, AnimeModels, Announcement, Categories, Comments, ComplaintList, Contact, ContactSubject, ContentComplaint, ContentNotification, DiscoverModels, FanArt, HomeSlider, Like, Manga, MangaList, MangaModels, MovieDTO, Notification, Ratings, Review, SiteInfo, SocialMediaAccount, Type, UserBlockList, UserEmailVertification, UserList, UserListContents, UserMessage, UserMessageModel, UserModel, Users } from '../types/Entites';
import ServiceResponse from '../types/ServiceResponse';
// export const baseUrl = "http://localhost:37323";
export const baseUrl = "https://api.lycorisa.com";
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
export const putUserInfo = async (nameSurname: string, username: string, about: string) => {
    return await api().put("/updateUserInfo/" + nameSurname + "/" + username + "/" + about);
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
export const putUserImg = async (formData: FormData) => {
    return await api().put<ServiceResponse<Users>>("/updateImage", formData);
}
export const getNotifications = async () => {
    return await api().get<ServiceResponse<Notification>>("/getNotifications");
}
export const getAnime = async (seoUrl: string) => {
    return await api().get<ServiceResponse<AnimeModels>>("/getAnime/" + seoUrl);
}
export const postLike = async (entity: Like) => {
    return await api().post<ServiceResponse<Like>>("/addLike", entity);
}
export const getLike = async (contentID: number, type: Type) => {
    return await api().get<ServiceResponse<Like>>("/getLike/" + contentID + "/" + type);
}
export const deleteLike = async (contentID: number, type: Type) => {
    return await api().delete<ServiceResponse<Like>>("/deleteLike/" + contentID + "/" + type);
}
export const postContentNotification = async (entity: ContentNotification) => {
    return await api().post<ServiceResponse<ContentNotification>>("/addContentNotification", entity);
}
export const deleteContentNotification = async (id: number) => {
    return await api().delete<ServiceResponse<ContentNotification>>("/deleteContentNotification/" + id);
}
export const postRating = async (entity: Ratings) => {
    return await api().post<ServiceResponse<Ratings>>("/addRating", entity);
}
export const putRating = async (entity: Ratings) => {
    return await api().put<ServiceResponse<Ratings>>("/updateRating", entity);
}
export const postReviews = async (entity: Review) => {
    return await api().post<ServiceResponse<Review>>("/addReviews", entity);
}
export const putReviews = async (entity: Review) => {
    return await api().put<ServiceResponse<Review>>("/updateReviews", entity);
}
export const deleteReview = async (id: number) => {
    return await api().delete<ServiceResponse<Review>>("/deleteReview/" + id);
}
export const getComments = async (contentID: number, type: Type) => {
    return await api().get<ServiceResponse<Comments>>("/getComments/" + contentID + "/" + type);
}
export const postComment = async (entity: Comments) => {
    return await api().post<ServiceResponse<Comments>>("/addComment", entity);
}
export const deleteComment = async (commentID: number, type: Type) => {
    return await api().delete("/deleteComment/" + commentID + "/" + type);
}
export const getHomeSliders = async () => {
    return await api().get<ServiceResponse<HomeSlider>>("/getHomeSliders");
}
export const getAnimes = async (pageNo: number, showCount: number) => {
    return await api().get<ServiceResponse<AnimeModels>>(`/getAnimes/${pageNo}/${showCount}`);
}
export const getMangas = async (pageNo: number, showCount: number) => {
    return await api().get<ServiceResponse<MangaModels>>(`/getMangas/${pageNo}/${showCount}`);
}
export const getManga = async (url: string) => {
    return await api().get<ServiceResponse<MangaModels>>("/getManga/" + url);
}
export const getCategories = async () => {
    return await api().get<ServiceResponse<Categories>>("/getCategories");
}
export const getDiscovers = async (type: number, sno: number, showCount: number) => {
    return await api().get<ServiceResponse<DiscoverModels>>("/getDiscovers/" + type + "/" + sno + "/" + showCount);
}
export const postContentComplaint = async (entity: ContentComplaint) => {
    return await api().post<ServiceResponse<ContentComplaint>>("/addContentComplaint", entity);
}
export const getMessages = async () => {
    return await api().get<ServiceResponse<UserMessageModel>>("/getMessages");
}
export const postMessage = async (message: UserMessage) => {
    return await api().post<ServiceResponse<UserMessage>>("/addMessage", message);
}
export const getSearchUser = async (message: string) => {
    return await api().get<ServiceResponse<UserMessageModel>>("/getSearchUser/" + message);
}
export const getSearchUserByID = async (id: number) => {
    return await api().get<ServiceResponse<UserMessageModel>>("/getSearchUserByID/" + id);
}
export const addContact = async (entity: Contact) => {
    return await api().post<ServiceResponse<Contact>>("/addContact", entity);
}
export const getContactSubject = async () => {
    return await api().get<ServiceResponse<ContactSubject>>("/getContactSubjects");
}
export const getAnnouncements = async () => {
    return await api().get<ServiceResponse<Announcement>>("/getAnnouncements");
}
export const getSocialMediaAccounts = async () => {
    return await api().get<ServiceResponse<SocialMediaAccount>>("/getSocialMediaAccounts");
}
export const getSiteInfo = async () => {
    return await api().get<ServiceResponse<SiteInfo>>("/siteInfo");
}
export const getHomePageMovie = async (pageNo: number, showCount: number) => {
    return await api().get<ServiceResponse<MovieDTO>>("/getHomePageMovie/" + pageNo + "/" + showCount)
}