import { Actions } from '../../../types';

const mainActions: Actions = {
    setUserInfo(context, payload) {
        context.commit('setUserInfo', payload);
    }
};

export default mainActions;
