import merge from '../../../../utils/mydash/merge/merge';
import { Mutations, ContactProps, ContactResponse, MainStoreState } from '../../../types';

const AVATAR_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';

const mainMutations: Mutations = {
    setUserInfo(_state: MainStoreState, payload) {
        return { userInfo: payload };
    },

    setAuthStatus(_state: MainStoreState, payload) {
        return { isLoggedIn: payload };
    },

    setChatsList(state: MainStoreState, payload) {
        const chats = payload as ContactResponse[];
        let isActiveContactRemains = false;
        const transformedChats = chats.map(chat => {
            if (chat.id === state.activeContactId) {
                isActiveContactRemains = true;
            }
            return {
                id: chat.id,
                title: chat.title,
                avatar: chat.last_message?.user.avatar 
                    ? AVATAR_BASE_URL + chat.last_message.user.avatar
                    : '',
                unreadCount: chat.unread_count,
                lastMessage: chat.last_message?.content || 'Сообщений пока нет!',
                date: chat.last_message?.time
                    ? new Date(chat.last_message.time).toLocaleString().split(', ')
                    : ['', ''],
                active: chat.id === state.activeContactId
            } as ContactProps;
        });

        return {
            contacts: transformedChats,
            activeContactId: isActiveContactRemains ? state.activeContactId : null
        };
    },

    selectActiveChat(state: MainStoreState, payload) {
        const contacts = state.contacts.map(contact => {
            contact.active = contact.id === payload ? true : false;
            return contact;
        });
        return {
            contacts: contacts,
            activeContactId: payload
        };
    },

    addSocket(state: MainStoreState, payload: { id: number, socket: unknown }) {
        const newSocket = { [payload.id]: payload.socket };
        return {
            sockets: merge(state.sockets, newSocket)
        };
    },

    removeSocket(state: MainStoreState, payload: number) {
        const newSocketsState = Object.assign({}, state.sockets);
        delete newSocketsState[payload];
        return {
            sockets: newSocketsState
        };
    }
};

export default mainMutations;
