import BaseController from './base-controller';
import ChatsAPI from '../api/chats-api';
import mainStore from '../core/store/app-stores/main/store-main';
import { ChatUserResponse } from '../core/types';

const chatsAPI = new ChatsAPI();

export default class ChatsController extends BaseController {
    public async getChats(title = '', limit = 100, offset = 0): Promise<void> {
        try {
            const response = await chatsAPI.getChats(title, limit, offset);
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

    public selectChat(id: number): void {
        mainStore.dispatch('selectActiveChat', id);
    }

    public async findUser(login: string): Promise<number | undefined> {
        try {
            const response = await chatsAPI.findChatUsers(login);
            if (response.status === 200) {
                const users = JSON.parse(response.response);
                return users[0]?.id;
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async getChatUsers(id: number): Promise<ChatUserResponse[] | undefined> {
        try {
            const response = await chatsAPI.getChatUsers(id);
            if (response.status === 200) {
                return JSON.parse(response.response);
            } else {
                this.pushErrorWarning('Не удалось получить список участников чата');
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }

    public async addUser(login: string): Promise<void> {
        try {
            const chatId = mainStore.state.activeContactId;
            if (typeof chatId !== 'number') {
                throw new Error('Сначала нужно выбрать чат');
            }
            const userId = await this.findUser(login);
            if (typeof userId !== 'number') {
                throw new Error('Пользователь не найден');
            }
            const response = await chatsAPI.addChatUsers([ userId ], chatId);
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

    public async deleteUser(login: string): Promise<void> {
        try {
            const chatId = mainStore.state.activeContactId;
            if (typeof chatId !== 'number') {
                throw new Error('Сначала нужно выбрать чат');
            }
            const chatUsers = await this.getChatUsers(chatId);
            if (chatUsers === undefined) {
                return; // Сообщение об ошибке уже показано в getChatUsers
            }
            const user = chatUsers.find(user => user.login === login);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            const response = await chatsAPI.deleteChatUsers([ user.id ], chatId);
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

    public async getToken(id: number): Promise<string | undefined> {
        try {
            const response = await chatsAPI.getToken(id);
            if (response.status === 200) {
                return JSON.parse(response.response).token;
            } else {
                this.handleBadResponse(response);
            }
        } catch (error) {
            this.pushErrorWarning(error.message);
        }
    }
}
