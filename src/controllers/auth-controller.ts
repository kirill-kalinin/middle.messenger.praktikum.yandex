import BaseController from './base-controller';
import AuthAPI from '../api/auth-api';
import mainStore from '../core/store/app-stores/main/store-main';

const authAPI = new AuthAPI();

export default class AuthController extends BaseController {
    public async login(formData: FormData): Promise<void> {
        try {
            const response = await authAPI.login(formData);
            console.log(response);
            if (response.status === 200) {
                this.getUserInfo() && this.redirectChats();
            } else if(response.status === 401) {
                this.pushErrorWarning('Неправильный логин или пароль');
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async signup(formData: FormData): Promise<void> {
        try {
            const response = await authAPI.signup(formData);
            console.log(response);
            if (response.status === 200) {
                this.getUserInfo() && this.redirectChats();
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async getUserInfo(): Promise<boolean | undefined> {
        try {
            const response = await authAPI.getUserInfo();
            console.log(response);
            if (response.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(response.response));
                mainStore.dispatch('setAuthStatus', true);
                return true;
            } else if (response.status === 401) {
                mainStore.dispatch('setAuthStatus', false);
            } else {
                this.handleBadResponse(response);
            }
            return false;
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async logout(): Promise<void> {
        try {
            const response = await authAPI.logout();
            console.log(response);
            if (response.status === 200) {
                location.reload();
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
