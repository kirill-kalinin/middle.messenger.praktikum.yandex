import { Actions } from '../../../types';

const actions: Actions = {
    addChat(context, payload) {
        context.commit('addChat', payload);
    },
    removeChat(context, payload) {
        context.commit('removeChat', payload);
    }
};

export default actions;
