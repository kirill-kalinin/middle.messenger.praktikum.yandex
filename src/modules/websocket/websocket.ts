export default class WebSocketConnection {

    private _soket: WebSocket;

    constructor(userId: number, chatId: number, token: string) {
        this._soket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

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

        this._soket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
        });

        this._soket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
    }
}
