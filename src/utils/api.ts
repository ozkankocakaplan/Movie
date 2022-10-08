import axios from 'axios';
import { UserModel } from '../types/Entites';
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