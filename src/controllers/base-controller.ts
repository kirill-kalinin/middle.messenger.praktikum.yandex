import Router from '../core/router/router';
import PopupHandler, { PopupTypes } from '../modules/popup-handler/popup-handler';

const router = new Router();
const popupHandler = new PopupHandler();

export default abstract class BaseController {
    protected handleBadResponce(responce: XMLHttpRequest): void {
        if (responce.status === 500) {
            this.redirect500();

        } else if (responce.status === 400) {
            const props = popupHandler.getWarningPreset(
                'Ошибка',
                `Некорректный запрос к серверу, код ошибки ${responce.status}`
            );
            popupHandler.pushPopup(props, PopupTypes.WARNING);

        } else if (responce.status === 401) {
            const props = popupHandler.getWarningPreset(
                'Ошибка',
                `Ошибка авторизации, код ошибки ${responce.status}`
            );
            popupHandler.pushPopup(props, PopupTypes.WARNING);
        }
    }

    protected pushErrorWarning(message: string): void {
        const props = popupHandler.getWarningPreset('Произошла ошибка:', message);
        popupHandler.pushPopup(props, PopupTypes.WARNING);
    }

    protected pushSuccesWarning(): void {
        const props = popupHandler.getWarningPreset('Успешно', 'Действие выполнено');
        popupHandler.pushPopup(props, PopupTypes.WARNING);
    }

    protected redirect404(): void {
        router.go('/404');
    }

    protected redirect500(): void {
        router.go('/500');
    }

    protected redirectChats(): void {
        router.go('/chat-select');
    }
}
