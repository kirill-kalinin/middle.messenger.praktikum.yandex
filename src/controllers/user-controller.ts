import BaseController from './base-controller';
import UserAPI from '../api/user-api';
import mainStore from '../core/store/app-stores/main/store-main';

const userAPI = new UserAPI();

export default class UserController extends BaseController {
    public async changeProfile(formData: FormData): Promise<void> {
        try {
            const responce = await userAPI.changeProfile(formData);
            console.log(responce);
            if (responce.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(responce.response));
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async changeAvatar(formData: FormData): Promise<void> {
        try {
            const responce = await userAPI.changeAvatar(formData);
            console.log(responce);
            if (responce.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(responce.response));
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async changePassword(formData: FormData): Promise<void> {
        try {
            const responce = await userAPI.changePassword(formData);
            console.log(responce);
            if (responce.status === 200) {
                this.pushSuccesWarning();
            } else {
                this.handleBadResponce(responce);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
