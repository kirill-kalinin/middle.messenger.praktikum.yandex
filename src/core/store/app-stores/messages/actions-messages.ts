import { Actions } from '../../../types';

const messagesActions: Actions = {
    pushMessage(context, payload) {
        context.commit('pushMessage', payload);
    },
    cleanMessages(context, payload) {
        context.commit('cleanMessages', payload);
    }
};

export default messagesActions;
