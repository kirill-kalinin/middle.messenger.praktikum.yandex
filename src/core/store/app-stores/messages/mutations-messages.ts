import { Mutations, MessagesStoreState, MessageResponse, MessageProps } from '../../../types';

const RESOURCE_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';

const messagesMutations: Mutations = {
    loadMessages(_state, payload: { userId: number, chatId: number, messages: MessageResponse[] }) {
        const chatId = payload.chatId;
        const messages = payload.messages.map(message => transformMessage(payload.userId, message));
        return {
            [chatId]: messages.reverse()
        };
    },

    pushMessage(state, payload: { userId: number, chatId: number, message: MessageResponse }) {
        const chatId = payload.chatId;
        const oldMessages = (state as MessagesStoreState)[chatId] || [];
        const transformedMessage = transformMessage(payload.userId, payload.message);
        return {
            [chatId]: [...oldMessages, transformedMessage]
        };
    },

    cleanMessages(_state, payload: number) {
        const chatId = payload;
        return {
            [chatId]: undefined
        };
    }
};

function transformMessage(userId: number, message: MessageResponse): MessageProps {
    return {
        isOwn: message.user_id === userId,
        isImage: message.file?.content_type === 'image/jpeg',
        isReaded: message.is_read,
        imgSrc: RESOURCE_BASE_URL + message.file?.path || '',
        text: message.file ? '' : message.content,
        date: new Date(message.time).toLocaleString().replace(', ', ' | ').replace(/\//g, '.')
    };
}

export default messagesMutations;
