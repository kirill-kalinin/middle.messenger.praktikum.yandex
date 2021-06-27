import { EventBusListeners } from '../types';

export default class EventBus {
    listeners: EventBusListeners;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (this._isRegistered(event)) {
            this.listeners[event] = this.listeners[event]
                .filter((cb: Function) => cb !== callback);
        }
    }

    emit(event: string, ...args: []): void {
        if (this._isRegistered(event)) {
            this.listeners[event].forEach(callback => {
                callback(...args);
            });
        }
    }
    
    private _isRegistered(event: string) {
        if (!this.listeners[event]) {
            throw new Error(`Error: Нет события: ${event}`);
        }
        return true;
    }
}
