import HTTPService from '../modules/http-services/http-service';

const messagesAPIInstance = new HTTPService();

export default class MessagesAPI {
    getToken(id: number): Promise<XMLHttpRequest> {
        return messagesAPIInstance.post(`/chats/token/${id}`, {
            credentials: true
        });
    }

    getNewMessagesCount(id: number): Promise<XMLHttpRequest> {
        return messagesAPIInstance.post(`/chats/new/${id}`, {
            credentials: true
        });
    }

    createResource(formData: FormData): Promise<XMLHttpRequest> {
        return messagesAPIInstance.post('/resources', {
            data: formData,
            credentials: true
        });
    }
}
