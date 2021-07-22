import BaseController from './base-controller';
import UserAPI from '../api/user-api';
import mainStore from '../core/store/app-stores/main/store-main';

const userAPI = new UserAPI();

export default class UserController extends BaseController {
    public async changeProfile(formData: FormData): Promise<void> {
        try {
            const response = await userAPI.changeProfile(formData);
            if (response.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(response.response));
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async changeAvatar(formData: FormData): Promise<void> {
        try {
            const response = await userAPI.changeAvatar(formData);
            if (response.status === 200) {
                mainStore.dispatch('setUserInfo', JSON.parse(response.response));
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async changePassword(formData: FormData): Promise<void> {
        try {
            const response = await userAPI.changePassword(formData);
            if (response.status === 200) {
                this.pushSuccesWarning();
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
