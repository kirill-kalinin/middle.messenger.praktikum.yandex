import BaseController from './base-controller';
import AuthAPI from '../api/auth-api';
import mainStore from '../core/store/app-stores/main/store-main';

const authAPI = new AuthAPI();

export default class AuthController extends BaseController {
    public async login(formData: FormData): Promise<void> {
        try {
            const responce = await authAPI.login(formData);
            console.log(responce);
            if (responce.status === 200) {
                this.getUserInfo() && this.redirectChats();
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async signup(formData: FormData): Promise<void> {
        try {
            const responce = await authAPI.signup(formData);
            console.log(responce);
            if (responce.status === 200) {
                this.getUserInfo() && this.redirectChats();
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async getUserInfo(): Promise<boolean | undefined> {
        try {
            const responce = await authAPI.getUserInfo();
            console.log(responce);
            if (responce.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(responce.response));
                return true;
            } else {
                this.handleBadResponce(responce);
                return false;
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async logout(): Promise<void> {
        try {
            const responce = await authAPI.logout();
            console.log(responce);
            if (responce.status === 200) {
                location.reload();
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
