import HTTPService from '../modules/http-services/http-service';

const authAPIInstance = new HTTPService();

export default class AuthAPI {
    getUserInfo(): Promise<XMLHttpRequest> {
        return authAPIInstance.get('/auth/user', {
            credentials: true
        });
    }

    login(formData: FormData): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/signin', {
            data: JSON.stringify(Object.fromEntries(formData.entries())),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    signup(formData: FormData): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/signup', {
            data: JSON.stringify(Object.fromEntries(formData.entries())),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    logout(): Promise<XMLHttpRequest> {
        return authAPIInstance.post('/auth/logout', {
            credentials: true
        });
    }
}
