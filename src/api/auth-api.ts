import HTTPService from '../modules/http-services/http-service';

const authAPIInstance = new HTTPService();

export default class AuthAPI {
    getUserInfo(): Promise<XMLHttpRequest> {
        return authAPIInstance.get('/auth/user');
    }

    login(jsonData: string): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/signin', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    signup(jsonData: string): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/signup', {
            data: jsonData, 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    logout(): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/logout');
    }
}
