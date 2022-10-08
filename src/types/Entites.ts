export enum Type {
    Anime = 1,
    Manga = 2,
    FanArt = 3,
    Comment = 4
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
    Image = 2
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
    UserWarning = 6
}
interface BaseEntity {
    id: number;
    createTime: string;
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
}
export interface UserModel extends Users {
    token: string;
    userLoginHistory: UserLoginHistory
}
export interface UserLoginHistory extends BaseEntity {
    userID: number;
    lastSeen: string;
}
