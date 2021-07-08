import HTTPService from '../modules/http-services/http-service';

const userAPIInstance = new HTTPService();

export default class UserAPI {
    changeProfile(jsonData: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/profile', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    changeAvatar(jsonData: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/profile/avatar', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    changePassword(jsonData: string): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/password', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }
}
