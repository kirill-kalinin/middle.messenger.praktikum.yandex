import WebSocketConnection from './websocket-connection';
import MessagesController from '../../controllers/messages-controller';
import mainStore from '../../core/store/app-stores/main/store-main';
import messagesStore from '../../core/store/app-stores/messages/store-messages';
import { ContactProps, MainStoreState } from '../../core/types';

const messagesController = new MessagesController();

export default class WebSocketHandler {
    private static __instance: WebSocketHandler | undefined;

    constructor() {
        if (WebSocketHandler.__instance) {
            return WebSocketHandler.__instance;
        }

        mainStore.subscribe('contacts', newState => {
            this._checkContactsList(newState as MainStoreState);
        });

        WebSocketHandler.__instance = this;
    }

    private _checkContactsList(state: MainStoreState): void {
        const userId = state.userInfo.id as number;
        const contacts = state.contacts;
        const sockets = state.sockets;
        contacts.forEach(contact => {
            if (!sockets[contact.id]) {
                this._establishConnection(userId, contact);
            }
        });
        Object.keys(sockets).forEach(id => {
            const contact = contacts.find(contact => contact.id === Number(id));
            if (!contact) {
                sockets[id].close();
                mainStore.dispatch('removeSocket', id);
                messagesStore.dispatch('cleanMessages', id);
            }
        });
    }

    private _establishConnection(userId: number, contact: ContactProps): void {
        messagesController.getToken(contact.id).then(token => {
            if (!token) {
                console.error('Не получен токен для чата', contact);
            } else {
                const id = contact.id;
                const socket = new WebSocketConnection(userId, contact.id, token);
                mainStore.dispatch('addSocket', { id, socket });
            }
        });
    }
}
