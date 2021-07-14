import EventBus from '../../modules/event-bus/event-bus';
import { Actions, Mutations, State, StoreParams, StateUpdateCallback } from '../types';

export default class Store {
    private _actions: Actions;
    private _mutations: Mutations;
    private _state: State;
    private _eventBus: () => EventBus;

    constructor(params: StoreParams) {
        const eventBus = new EventBus();

        this._actions = params.actions;
        this._mutations = params.mutations;
        this._eventBus = () => eventBus;

        this._state = new Proxy(params.state || {}, {
            set: (state, key, value) => {
                if (typeof key !== 'string') {
                    throw new Error('Нельзя использовать символы');
                }
                state[key] = value;

                this._eventBus().emit(key, this._state);

                return true;
            }
        });
    }

    public dispatch(actionKey: string, payload: unknown): boolean {
        if (typeof this._actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} не найден`);
            return false;
        }

        this._actions[actionKey](this, payload);

        return true;
    }

    public commit(mutationKey: string, payload: unknown): boolean {
        if (typeof this._mutations[mutationKey] !== 'function') {
            console.error(`Mutation "${mutationKey}" не найден`);
            return false;
        }

        const newState = this._mutations[mutationKey](this._state, payload);
        this._state = Object.assign(this._state, newState);

        return true;
    }

    public get state(): State {
        return this._state;
    }

    public subscribe(changedKey: string, callback: StateUpdateCallback): void {
        this._eventBus().on(changedKey, callback);
    }

    public unsubscribe(changedKey: string, callback: StateUpdateCallback): void {
        this._eventBus().off(changedKey, callback);
    }
}
