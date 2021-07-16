import { Mutations, MessagesStoreState, MessageProps } from '../../../types';

const messagesMutations: Mutations = {
    pushMessage(state, payload: { chatId: number, message: MessageProps}) {
        const chatId = payload.chatId;
        const oldMessages = (state as MessagesStoreState)[chatId] || [];
        return {
            [chatId]: [...oldMessages, payload.message]
        };
    },
    cleanMessages(_state, payload: number) {
        const chatId = payload;
        return {
            [chatId]: undefined
        };
    }
};

export default messagesMutations;
