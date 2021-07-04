import EventBus from '../../modules/event-bus/event-bus';
import merge from '../../utils/mydash/merge/merge';
import { Actions, Mutations, State, StoreStatus, storeParams, stateUpdateCallback } from '../types';

const STATE_CHANGED = 'STATE_CHANGED';

export default class Store {
    private _actions: Actions;
    private _mutations: Mutations;
    private _state: State;
    private _status: StoreStatus;
    private _eventBus: () => EventBus;

    constructor(params: storeParams) {
        const eventBus = new EventBus();

        this._actions = params.actions;
        this._mutations = params.mutations;
        this._status = 'resting';
        this._eventBus = () => eventBus;

        this._state = new Proxy(params.state || {}, {
            set: (state, key, value) => {
                if (typeof key === 'symbol') {
                    throw new Error('Нельзя использовать символы');
                }
                state[key] = value;

                console.log(`State changed: ${key}: ${value}`);

                this._eventBus().emit(STATE_CHANGED, this._state);
                if (this._status !== 'mutation') {
                    console.warn(`Следует использовать mutation для изменения ${key}`);
                }
                this._status = 'resting';

                return true;
            }
        });

        // debug
        Object.defineProperty(window, 'getState', {
            get: () => this.getState()
        });
    }

    public dispatch(actionKey: string, payload: State): boolean {
        if (typeof this._actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} не найден`);
            return false;
        }

        console.groupCollapsed(`Action: ${actionKey}`);

        this._status = 'action';
        this._actions[actionKey](this, payload);

        console.groupEnd();

        return true;
    }

    public commit(mutationKey: string, payload: State): boolean {
        if (typeof this._mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" не найден`);
            return false;
        }

        this._status = 'mutation';
        const newState = this._mutations[mutationKey](this._state, payload);
        this._state = merge(this._state, newState);

        return true;
    }

    public getState(): State {
        return this._state;
    }

    public subscribe(callback: stateUpdateCallback): void {
        this._eventBus().on(STATE_CHANGED, callback);
    }

    public unsubscribe(callback: stateUpdateCallback): void {
        this._eventBus().off(STATE_CHANGED, callback);
    }
}
