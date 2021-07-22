import { BlockProps, Selectors, State } from '../../../types';

const messagesSelectors: Selectors = {
    getMessages(state: State, payload: unknown): BlockProps {
        const activeContactId = payload;
        if (activeContactId !== Number(activeContactId) || !state[activeContactId]) {
            return { messages: [] };
        }
        return { messages: state[activeContactId] };
    }
};

export default messagesSelectors;
