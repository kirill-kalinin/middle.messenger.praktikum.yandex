import { Actions } from '../../../types';

const messagesActions: Actions = {
    addChat(context, payload) {
        context.commit('addChat', payload);
    },
    removeChat(context, payload) {
        context.commit('removeChat', payload);
    }
};

export default messagesActions;
