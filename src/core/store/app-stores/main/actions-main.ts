import { Actions } from '../../../types';

const mainActions: Actions = {
    setUserInfo(context, payload) {
        context.commit('setUserInfo', payload);
    },
    setAuthStatus(context, payload) {
        context.commit('setAuthStatus', payload);
    }
};

export default mainActions;
