import Router from './core/router/router';
import appRoutes from './core/router/routes';
import FormHandler from './modules/form-handler/form-handler';
import AuthController from './controllers/auth-controller';
import ChatsController from './controllers/chats-controller';
import { PageCreator } from './core/types';

const router = new Router();
appRoutes.forEach((route: [string, PageCreator]) => router.use(...route));
router.start();

const formHandler = new FormHandler();
formHandler.handleSubmit();

const authControllerInstance = new AuthController();
const chatsController = new ChatsController();

authControllerInstance.getUserInfo().then(isLoggedIn => {
    if (isLoggedIn) {
        chatsController.getChats();
    }
});
