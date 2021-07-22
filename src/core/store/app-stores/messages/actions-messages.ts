import { Actions } from '../../../types';

const messagesActions: Actions = {
    loadMessages(context, payload) {
        context.commit('loadMessages', payload);
    },
    pushMessage(context, payload) {
        context.commit('pushMessage', payload);
    },
    cleanMessages(context, payload) {
        context.commit('cleanMessages', payload);
    }
};

export default messagesActions;
