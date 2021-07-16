// import messagesStore from '../../core/store/app-stores/messages/store-messages';

export default class WebSocketConnection {

    private _soket: WebSocket;

    constructor(userId: number, chatId: number, token: string) {
        this._soket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        setInterval(() => this._soket.send(JSON.stringify({ type: 'ping' })), 10000);

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
            console.log('Получены данные', event.data);
        });
    }

    public send(form: FormData): void {
        console.log(Object.fromEntries(form.entries()));
        const data = Object.fromEntries(form.entries());
        this._soket.send(JSON.stringify({
            content: data.message,
            type: 'message',
        }));
    }

    public close(): void {
        this._soket.close();
    }
}
