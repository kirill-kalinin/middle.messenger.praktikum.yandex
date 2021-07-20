import { Mutations, MessagesStoreState, MessageResponse, MessageProps } from '../../../types';

const messagesMutations: Mutations = {
    loadMessages(_state, payload: { userId: number, chatId: number, messages: MessageResponse[] }) {
        const chatId = payload.chatId;
        const messages = payload.messages.map(message => transformMessage(payload.userId, message));
        return {
            [chatId]: messages.reverse()
        }
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
        isImage: message.file?.content_type === 'image',
        isReaded: message.is_read,
        imgSrc: message.file?.path || '',
        text: message.content,
        date: new Date(message.time).toLocaleString().replace(', ', ' | ').replace(/\//g, '.')
    }
};

export default messagesMutations;
