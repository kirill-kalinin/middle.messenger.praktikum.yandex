import BaseController from './base-controller';
import MessagesAPI from '../api/messages-api';

const messagesAPI = new MessagesAPI();

export default class MessagesController extends BaseController {
    public async getToken(id: number): Promise<string | undefined> {
        try {
            const response = await messagesAPI.getToken(id);
            if (response.status === 200) {
                return JSON.parse(response.response).token;
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async getNewMessagesCount(id: number): Promise<string | undefined> {
        try {
            const response = await messagesAPI.getNewMessagesCount(id);
            if (response.status === 200) {
                return JSON.parse(response.response).unread_count;
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async createResource(formData: FormData): Promise<string | undefined> {
        try {
            const response = await messagesAPI.createResource(formData);
            if (response.status === 200) {
                return JSON.parse(response.response).id;
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
