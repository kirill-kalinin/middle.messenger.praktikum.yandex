import { BaseAPI } from '../modules/http-services/base-api';
import HTTPService from '../modules/http-services/http-service';

const chatMessagesAPIInstance  = new HTTPService();

export default class ChatMessagesAPI extends BaseAPI {
    request(id: string): Promise<unknown> {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
