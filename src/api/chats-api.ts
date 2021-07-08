import HTTPService from '../modules/http-services/http-service';

const chatsAPIInstance = new HTTPService();

export default class ChatsAPI {
    getChats(offset: number, limit: number, title: string): Promise<XMLHttpRequest> {
        return chatsAPIInstance.get('/chats', {
            data: { offset, limit, title }
        });
    }

    createChat(title: string): Promise<XMLHttpRequest> {
        return chatsAPIInstance.post('/chats', {
            data: JSON.stringify({ title }), 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    deleteChat(chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.delete('/chats', {
            data: JSON.stringify({ chatId }), 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    addUsers(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.put('/chats/users', {
            data: JSON.stringify({ users, chatId }), 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    deleteUsers(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.delete('/chats/users', {
            data: JSON.stringify({ users, chatId }), 
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    getToken(id: string): Promise<XMLHttpRequest> {
        return chatsAPIInstance.post(`/chats/token/${id}`, {
            credentials: true
        });
    }
}
