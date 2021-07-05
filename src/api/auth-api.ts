import HTTPService from '../modules/http-services/http-service';

const authAPIInstance = new HTTPService();

export default class AuthAPI {
    getUserInfo(): Promise<unknown> {
        return authAPIInstance.get('/auth/user');
    }

    login(jsonData: string): Promise<unknown> {
        return authAPIInstance.post('/auth/signin', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    signup(jsonData: string): Promise<unknown> {
        return authAPIInstance.post('/auth/signup', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    logout(): Promise<unknown> {
        return authAPIInstance.post('/auth/logout');
    }
}
