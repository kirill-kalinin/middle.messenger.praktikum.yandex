import Router from "../../core/router/router";

const router = new Router();

export default class RouteSwitcher {
    redirect404() {
        router.go('/404');
    }

    redirect500() {
        router.go('/500');
    }

    redirectChats() {
        router.go('/chats');
    }
}
