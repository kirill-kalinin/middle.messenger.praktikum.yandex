import { BaseAPI } from '../modules/http-services/base-api';
import HTTPService from '../modules/http-services/http-service';

const chatAPIInstance = new HTTPService();

export default class ChatAPI extends BaseAPI {
    request(): Promise<unknown> {
        return chatAPIInstance.get('/full');
    }

    create(): Promise<unknown> {
        return chatAPIInstance.post('/');
    }
}
