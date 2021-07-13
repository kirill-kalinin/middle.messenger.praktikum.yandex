import HTTPService from '../modules/http-services/http-service';

const chatsAPIInstance = new HTTPService();

export default class ChatsAPI {
    getChats(title: string, limit: number, offset: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.get('/chats', {
            data: { title, limit, offset },
            credentials: true
        });
    }

    createChat(title: string): Promise<XMLHttpRequest> {
        return chatsAPIInstance.post('/chats', {
            data: JSON.stringify({ title }),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    deleteChat(chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.delete('/chats', {
            data: JSON.stringify({ chatId }),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    findUsers(login: string): Promise<XMLHttpRequest> {
        return chatsAPIInstance.post('/user/search', {
            data: JSON.stringify({ login }),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    addUsers(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.put('/chats/users', {
            data: JSON.stringify({ users, chatId }),
            credentials: true,
            headers: [
                ['Content-type', 'application/json; charset=utf-8']
            ]
        });
    }

    deleteUsers(users: number[], chatId: number): Promise<XMLHttpRequest> {
        return chatsAPIInstance.delete('/chats/users', {
            data: JSON.stringify({ users, chatId }),
            credentials: true,
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
