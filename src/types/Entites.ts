
export interface AnimeFilter {
    category: Categories;
    point: number;
    order: 'AZ' | null;
    type: VideoType | number;
}
export interface MangaFilter {
    category: Categories;
    point: number;
    order: 'AZ' | null;
    type: VideoType | number;
}




interface BaseEntity {
    id: number;
    createTime: string;
}
export enum Type {
    Anime = 1,
    Manga = 2,
    FanArt = 3,
    Comment = 4,
    Review = 5
}

export enum RoleType {
    Admin = 1,
    User = 2,
    Moderator = 3
}

export enum Status {
    Approved = 1,
    NotApproved = 2,
    Continues = 3,
    Completed = 4
}

export enum VideoType {
    AnimeSeries = 1,
    AnimeMovie = 2
}

export enum ComplaintType {
    Video = 1,
    Image = 2,
    Content = 3
}

export enum AnimeStatus {
    IWatched = 1,
    IWillWatch = 2,
    Watching = 3
}

export enum MangaStatus {
    IRead = 1,
    IWillRead = 2,
    Reading = 3
}

export enum NotificationType {
    Comments = 1,
    Message = 2,
    Rosette = 3,
    Anime = 4,
    Manga = 5,
    UserWarning = 6,
    Review = 7
}

export interface Anime extends BaseEntity {
    img: string;
    animeName: string;
    animeDescription: string;
    ageLimit: string;
    seasonCount: number;
    showTime: string;
    status: Status;
    videoType: VideoType;
    malRating: string;
    siteRating: string;
    seoUrl: string;
}
export interface AnimeEpisodes extends BaseEntity {
    animeID: number;
    seasonID: number;
    episodeName: string;
    episodeDescription: string;
}
export interface AnimeList extends BaseEntity {
    userID: number;
    animeID: number;
    episodeID: number;
    animeStatus: AnimeStatus;
    anime: Anime;
    animeEpisode: AnimeEpisodes;
}
export interface AnimeOfTheWeek extends BaseEntity {
    animeID: number;
    userID: number;
    description: string;
}
export interface Ratings extends BaseEntity {
    userID: number;
    animeID: number;
    rating: number;
    type: Type;
}
export interface AnimeSeason extends BaseEntity {
    seasonName: string;
    animeID: number;
}
export interface AnimeSeasonMusic extends BaseEntity {
    seasonID: number;
    musicName: string;
    musicUrl: string;
}
export interface Announcement extends BaseEntity {
    updateInformation: string;
    updateDate: string;
    innovationInformation: string;
    innovationDate: string;
    complaintsInformation: string;
    complaintsDate: string;
    addToInformation: string;
    addDate: string;
    warningInformation: string;
    warningDate: string;
    comingSoonInfo: string;
    comingSoonDate: string;
    about: string
}
export interface Categories extends BaseEntity {
    name: string;
}
export interface Comments extends BaseEntity {
    userID: number;
    contentID: number;
    comment: string;
    isSpoiler: boolean;
    type: Type;
    users: Users
}
export interface ComplaintList extends BaseEntity {
    complainantID: number;
    userID: number;
    description: string;
}

export interface Contact extends BaseEntity {
    nameSurname: string;
    email: string;
    subject: string;
    message: string;
}
export interface ContactSubject extends BaseEntity {
    subject: string;
}

export interface ContentComplaint extends BaseEntity {
    userID: number;
    contentID: number;
    message: string;
    type: Type;
    complaintType: ComplaintType;
}

export interface Episodes extends BaseEntity {
    episodeID: number;
    alternativeName: string;
    alternativeVideoUrl: string;
    alternativeVideoDownloadUrl: string;
}

export interface FanArt extends BaseEntity {
    userID: number;
    contentID: number;
    image: string;
    description: string;
    type: Type;
    user: Users
}

export interface HomeSlider extends BaseEntity {
    image: string;
    sliderTitle: string;
    description: string;
    url: string;
    isDisplay: boolean;
}

export interface Like extends BaseEntity {
    type: Type;
    userID: number;
    contentID: number;
    episodeID: number;
}

export interface Manga extends BaseEntity {
    animeID: number
    image: string;
    name: string;
    description: string;
    arrangement: string;
    views: number;
    ageLimit: string;
    status: Status;
    seoUrl: string;
    malRating: string;
    siteRating: string;
}

export interface MangaEpisodeContent extends BaseEntity {
    episodeID: number;
    contentImage: string;
    description: string;
    contentOrder: number;
}

export interface MangaEpisodes extends BaseEntity {
    mangaID: number;
    name: string;
    description: string;
}

export interface MangaList extends BaseEntity {
    userID: number;
    mangaID: number;
    episodeID: number;
    status: MangaStatus;
}

export interface Notification extends BaseEntity {
    notificationType: NotificationType;
    userID: number;
    notificationMessage: string;
    isReadInfo: boolean;
}

export interface Review extends BaseEntity {
    contentID: number;
    userID: number;
    message: string;
    type: Type;
}

export interface Rosette extends BaseEntity {
    name: string;
    img: string;
}

export interface SiteDescription extends BaseEntity {
    keywords: string;
    description: string;
    instagramUrl: string;
    youtubeUrl: string;
    discordUrl: string;
}

export interface SocialMediaAccount extends BaseEntity {
    userID: number;
    gmailUrl: string;
    instagramUrl: string;
}

export interface UserBlockList extends BaseEntity {
    userID: number;
    blockID: number;
    isBlocked: boolean;
}

export interface UserEmailVertification extends BaseEntity {
    email: string;
    code: string;
}

export interface UserForgotPassword extends BaseEntity {
    userID: number;
    resetLink: string;
}

export interface UserLoginHistory extends BaseEntity {
    userID: number;
    lastSeen: string;
}

export interface UserRosette extends BaseEntity {
    userID: number;
    rosetteID: number;
    status: Status;
    rosette: Rosette
}

export interface Users extends BaseEntity {
    image: string;
    nameSurname: string;
    userName: string;
    birthDay: string;
    email: string;
    password: string;
    discover: string;
    gender: string;
    isBanned: boolean;
    seoUrl: string;
    roleType: RoleType;
    about: string;
}
export interface UserModel extends Users {
    token: string;
    userLoginHistory: UserLoginHistory
}
export interface CategoryType extends BaseEntity {
    categoryID: number,
    contentID: number,
    type: Type,
    categories: Categories
}
export interface RosetteContent extends BaseEntity {
    contentID: number,
    rosetteID: number,
    episodesID: number,
    type: Type
}
export interface RosetteModels {
    rosette: Rosette;
    manga: Manga;
    anime: Anime;
    animeEpisodes: AnimeEpisodes[];
    mangaEpisodes: MangaEpisodes[];
    rosetteContents: RosetteContent[];
}
export interface ReportModels {
    categoriesCount: number;
    rosetteCount: number;
    mangaCount: number;
    animeCount: number;
    userCount: number;
}
export interface FanArtModels extends FanArt {
    anime: Anime;
    manga: Manga;
}
export interface UserList extends BaseEntity {
    userID: number;
    listName: string;
}
export interface UserListContents extends BaseEntity {
    userID: number;
    listID: number;
    contentID: number;
    episodeID: number;
    type: Type;
    userList: UserList;
    users: Users;
}
export interface UserListModels extends UserListContents {
    anime: Anime;
    manga: Manga;
    animeEpisodes: AnimeEpisodes[];
    mangaEpisodes: MangaEpisodes[];
    categories: CategoryType[];
    animeSeasons: AnimeSeason[];
}
export interface UserFullModels {
    user: Users;
    userListModels: UserListModels[];
    rosettes: UserRosette[];
    fanArts: FanArt[];
    reviews: ReviewsModels[];
    animeLists: AnimeList[];
    mangaLists: MangaList[];
    userLists: UserList[];
    userListContents: UserListContents[];
    animeListModels: AnimeListModels[];
    mangaListModels: MangaListModels[];
}
export interface AnimeListModels extends UserListModels {
    animeList: AnimeList;
    anime: Anime;
    animeEpisodes: AnimeEpisodes[];
    categories: CategoryType[];
    animeSeasons: AnimeSeason[];
}
export interface MangaListModels extends UserListModels {
    mangaList: MangaList;
    manga: Manga;
    mangaEpisodes: MangaEpisodes[];
    categories: CategoryType[]
}
export interface AnimeAndMangaModels extends BaseEntity {
    name: string;
    img: string;
    url: string;
    reviewsCount: number;
    fanArtCount: number;
    like: number;
    arrangement: number;
    type: Type;
    videoType: VideoType;
    categories: CategoryType[];
    animeSeasons: AnimeSeason[];
    animeEpisodes: AnimeEpisodes[];
    mangaEpisodes: MangaEpisodes[];
}
export interface ContentNotification extends BaseEntity {
    userID: number;
    contentID: number;
    type: Type;
    user: Users;
}
export interface AnimeModels {
    anime: Anime;
    manga: Manga;
    like: Like;
    animeRating: Ratings;
    contentNotification: ContentNotification;
    categories: CategoryType[];
    episodes: Episodes[];
    animeSeasons: AnimeSeason[];
    animeSeasonMusics: AnimeSeasonMusic[];
    animeEpisodes: AnimeEpisodes[];
    animeLists: AnimeList[];
    animeImages: AnimeImages[];
    rating: number;
    arrangement: number;
    likeCount: number;
    viewsCount: number;

}
export interface ReviewsModels extends Review {
    anime: Anime;
    manga: Manga;
    likes: Like[];
    comments: Comments[];
}
export interface MangaModels {
    anime: Anime;
    manga: Manga;
    like: Like;
    mangaRating: Ratings;
    contentNotification: ContentNotification;
    categories: CategoryType[];
    mangaEpisodes: MangaEpisodes[];
    mangaEpisodeContents: MangaEpisodeContent[];
    mangaImages: MangaImages[];
    mangaLists: MangaList[];
    rating: number;
    arrangement: number;
    likeCount: number;
    viewsCount: number;
    mangaEpisodeCount: number;
}
export interface FanArtModel extends FanArt {
    anime: Anime;
    manga: Manga;
    likes: Like[];
    comments: Comments[];
}
export interface MovieTheWeek extends BaseEntity {
    contentID: number;
    userID: number;
    description: string;
    type: Type;
}
export interface MovieTheWeekModels extends MovieTheWeek {
    anime: Anime;
    manga: Manga;
    users: Users;
}
export interface DiscoverModels {
    fanArts: FanArtModel[];
    reviews: ReviewsModels[];
    topAnimes: Anime[];
    topMangas: Manga[];
    movieTheWeeks: MovieTheWeekModels[];
}
export interface UserMessage extends BaseEntity {
    receiverID: number;
    senderID: number;
    message: string;
}
export interface UserMessageModel extends Users {
    userMessages: UserMessage[];
}
export interface AnimeImages extends BaseEntity {
    animeID: number;
    img: string | null;
}
export interface MangaImages extends BaseEntity {
    mangaID: number;
    img: string | null;
}