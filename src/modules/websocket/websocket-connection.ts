import messagesStore from '../../core/store/app-stores/messages/store-messages';

export default class WebSocketConnection {

    private _soket: WebSocket;
    private _userId: number;
    private _chatId: number;
    private _ping;

    constructor(userId: number, chatId: number, token: string) {
        this._soket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this._userId = userId;
        this._chatId = chatId;
        this._ping = setInterval(() => this._soket.send(JSON.stringify({ type: 'ping' })), 10000);

        this._soket.addEventListener('open', () => {
            this._soket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        });

        this._soket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this._soket.addEventListener('error', event => {
            console.error('Ошибка', event);
        });

        this._soket.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
                messagesStore.dispatch('loadMessages', {
                    userId: this._userId, chatId: this._chatId, messages: data
                });
            } else if(data.type === 'message' || data.type === 'file') {
                messagesStore.dispatch('pushMessage', {
                    userId: this._userId, chatId: this._chatId, message: data
                });
            }
        });
    }

    public send(form: FormData): void {
        const data = Object.fromEntries(form.entries());
        if (data.message === '') {
            return;
        }
        this._soket.send(JSON.stringify({
            content: data.message,
            type: 'message',
        }));
    }

    public close(): void {
        clearInterval(this._ping);
        this._soket.close();
    }
}
