import Router from '../core/router/router';
import PopupHandler from '../modules/popup-handler/popup-handler';

const router = new Router();
const popupHandler = new PopupHandler();

export default abstract class BaseController {
    protected handleBadResponse({ status, response}: XMLHttpRequest): void {
        const message = JSON.parse(response).reason;
        if (status === 500) {
            this.redirect500();

        } else if (status === 400) {
            this._pushPopup(`Ошибка ${status}`, message || 'Переданы некорректные данные');

        } else if (status === 401) {
            this._pushPopup(`Ошибка ${status}`, message || 'Вы не авторизованы');

        } else if (status === 403) {
            this._pushPopup(`Ошибка ${status}`, message || 'Нет прав для выполнения действия');

        } else {
            this.pushErrorWarning('Неизвестная ошибка в работе приложения');
        }
    }

    protected redirect500(): void {
        router.go('/500');
    }

    protected pushErrorWarning(message: string): void {
        this._pushPopup('Произошла ошибка', message);
    }

    protected pushSuccesWarning(): void {
        this._pushPopup('Успешно', 'Действие выполнено');
    }

    private _pushPopup(title: string, message: string): void {
        const props = popupHandler.getWarningPreset(title, message);
        popupHandler.pushPopup(props, {});
    }
}
