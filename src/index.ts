import Router from './core/router/router';
import appRoutes from './core/router/routes';
import FormHandler from './modules/form-handler/form-handler';
import AuthController from './controllers/auth-controller';
import { PageCreator } from './core/types';

const router = new Router();
appRoutes.forEach((route: [string, PageCreator]) => router.use(...route));
router.start();

const formHandler = new FormHandler();
formHandler.handleSubmit();

const authControllerInstance = new AuthController();
const isLoggedIn = authControllerInstance.getUserInfo();
// Инстанцируем контроллер чатов, если isLoggedIn - загружаем чаты
// Активный чат сбрасывается при перезагрузке страницы
// Сообщения подгружаются после выбора активного чата

// debug
Object.defineProperty(window, 'logout', {
    value: authControllerInstance.logout
});
