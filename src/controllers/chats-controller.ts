import BaseController from './base-controller';
import ChatsAPI from '../api/chats-api';
import mainStore from '../core/store/app-stores/main/store-main';

const chatsAPI = new ChatsAPI();

export default class ChatsController extends BaseController {
    public async getChats(title = '', limit = 100, offset = 0): Promise<void> {
        try {
            const response = await chatsAPI.getChats(title, limit, offset);
            console.log(response);
            if (response.status === 200) {
                mainStore.dispatch('setChatsList', JSON.parse(response.response));
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async createChat(title: string): Promise<void> {
        try {
            const response = await chatsAPI.createChat(title);
            console.log(response);
            if (response.status === 200) {
                this.pushSuccesWarning();
                this.getChats();
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async deleteChat(id: number): Promise<void> {
        try {
            const response = await chatsAPI.deleteChat(id);
            console.log(response);
            if (response.status === 200) {
                this.pushSuccesWarning();
                this.getChats();
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async addUser(): Promise<void> {
        console.log('addUser');
    }

    public async deleteUser(): Promise<void> {
        console.log('deleteUser');
    }
}
