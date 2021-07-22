import { Actions } from '../../../types';

const mainActions: Actions = {
    setUserInfo(context, payload) {
        context.commit('setUserInfo', payload);
    },
    setAuthStatus(context, payload) {
        context.commit('setAuthStatus', payload);
    },
    setChatsList(context, payload) {
        context.commit('setChatsList', payload);
    },
    selectActiveChat(context, payload) {
        context.commit('selectActiveChat', payload);
    },
    addSocket(context, payload) {
        context.commit('addSocket', payload);
    },
    removeSocket(context, payload) {
        context.commit('removeSocket', payload);
    }
};

export default mainActions;
