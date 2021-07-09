import HTTPService from '../modules/http-services/http-service';

const userAPIInstance = new HTTPService();

export default class UserAPI {
    changeProfile(formData: FormData): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/profile', {
            data: JSON.stringify(Object.fromEntries(formData.entries())),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    changeAvatar(formData: FormData): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/profile/avatar', {
            data: formData,
            credentials: true
        });
    }

    changePassword(formData: FormData): Promise<XMLHttpRequest> {
        return userAPIInstance.put('/user/password', {
            data: JSON.stringify(Object.fromEntries(formData.entries())),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }
}
