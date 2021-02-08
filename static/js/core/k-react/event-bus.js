export default class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (this._isRegistered(event)) {
            this.listeners[event] = this.listeners[event]
                .filter((cb) => cb !== callback);
        }
    }
    emit(event, ...args) {
        if (this._isRegistered(event)) {
            this.listeners[event].forEach(callback => {
                callback(...args);
            });
        }
    }
    _isRegistered(event) {
        if (!this.listeners[event]) {
            throw new Error(`Error: Нет события: ${event}`);
        }
        return true;
    }
}
//# sourceMappingURL=event-bus.js.map