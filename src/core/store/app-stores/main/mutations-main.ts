import { Mutations, MainStoreState } from '../../../types';

const mainMutations: Mutations = {
    setUserInfo(_state, payload) {
        return { userInfo: payload };
    },
    setAuthStatus(_state, payload) {
        return { isLoggedIn: payload };
    },
    setChatsList(state, payload) {
        const chats = payload as MainStoreState['contacts'];
        const currentActiveContact = chats.find(contact => contact.id === state.activeContactId);
        return {
            contacts: chats,
            activeContactId: currentActiveContact ? state.activeContactId : null
        };
    }
};

export default mainMutations;
