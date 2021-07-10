import Router from '../core/router/router';
import PopupHandler, { PopupTypes } from '../modules/popup-handler/popup-handler';

const router = new Router();
const popupHandler = new PopupHandler();

export default abstract class BaseController {
    protected handleBadResponse({ status, response}: XMLHttpRequest): void {
        const message = JSON.parse(response).reason;
        if (status === 500) {
            this.redirect500();

        } else if (status === 400) {
            const props = popupHandler.getWarningPreset(
                `Ошибка ${status}`,
                message || 'Переданы некорректные данные'
            );
            popupHandler.pushPopup(props, PopupTypes.WARNING);

        } else if (status === 401) {
            const props = popupHandler.getWarningPreset(
                `Ошибка ${status}`,
                message || 'Вы не авторизованы'
            );
            popupHandler.pushPopup(props, PopupTypes.WARNING);

        } else {
            this.pushErrorWarning('Неизвестная ошибка в работе приложения');
        }
    }

    protected pushErrorWarning(message: string): void {
        const props = popupHandler.getWarningPreset('Произошла ошибка', message);
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

    protected redirectLogin(): void {
        router.go('/login');
    }
}
