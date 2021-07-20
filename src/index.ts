import Router from './core/router/router';
import appRoutes from './core/router/routes';
import FormHandler from './modules/form-handler/form-handler';
import AuthController from './controllers/auth-controller';
import ChatsController from './controllers/chats-controller';
import WebSocketHandler from './modules/websocket/websocket-handler';
import { PageCreator } from './core/types';

import mainStore from './core/store/app-stores/main/store-main';

const router = new Router();
appRoutes.forEach((route: [string, PageCreator]) => router.use(...route));
router.start();

const formHandler = new FormHandler();
formHandler.handleSubmit();

const authControllerInstance = new AuthController();
const chatsController = new ChatsController();

new WebSocketHandler();

authControllerInstance.getUserInfo().then(isLoggedIn => {
    if (isLoggedIn) {
        chatsController.getChats();
    }
});

setInterval(() => {
    if (mainStore.state.isLoggedIn) {
        chatsController.getChats()
    }
}, 10000);
