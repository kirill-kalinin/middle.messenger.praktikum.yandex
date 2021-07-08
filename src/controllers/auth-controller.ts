import AuthAPI from '../api/auth-api';
import mainStore from '../core/store/app-stores/main/store-main';
import mainActions from '../core/store/app-stores/main/actions-main';
import RouteSwitcher from '../modules/route-switcher/route-switcher';
import PopupHandler from '../modules/popup-handler/popup-handler';

const authAPI = new AuthAPI();
const routeSwitcher = new RouteSwitcher();
const popupHandler = new PopupHandler();

export default class AuthController {
    public async login(jsonData: string): Promise<void> {
        try {
            const responce = await authAPI.login(jsonData);
            if (responce.status === 200) {
                this.getUserInfo() && routeSwitcher.redirectChats();
            } else {
                this._handleBadResponce(responce);
            }
        } catch (error) {
            popupHandler.getErrorWarningPreset(error.message);
        }
    }

    public async signup(jsonData: string): Promise<void> {
        try {
            const responce = await authAPI.signup(jsonData);
            if (responce.status === 200) {
                this.getUserInfo() && routeSwitcher.redirectChats();
            } else {
                this._handleBadResponce(responce);
            }
        } catch (error) {
            popupHandler.getErrorWarningPreset(error.message);
        }
    }

    public async getUserInfo(): Promise<boolean | undefined> {
        try {
            const responce = await authAPI.getUserInfo();
            if (responce.status === 200 && responce.responseType === 'json') {
                mainActions.setUserInfo(mainStore, JSON.parse(responce as unknown as string));
                return true;
            } else {
                this._handleBadResponce(responce);
                return false;
            }
        } catch (error) {
            popupHandler.getErrorWarningPreset(error.message);
        }
    }

    public async logout(): Promise<void> {
        try {
            const responce = await authAPI.logout();
            if (responce.status === 200) {
                location.reload();
            } else {
                this._handleBadResponce(responce);
            }
        } catch (error) {
            popupHandler.getErrorWarningPreset(error.message);
        }
    }

    private _handleBadResponce(responce: XMLHttpRequest): void {
        if (responce.status === 500) {
            routeSwitcher.redirect500();
        } else if (responce.status === 400) {
            popupHandler.getErrorWarningPreset(`Некорректный запрос к серверу, код ошибки ${responce.status}`);
        } else if (responce.status === 401) {
            popupHandler.getErrorWarningPreset(`Требуется авторизация, код ошибки ${responce.status}`);
        }
    }
}
