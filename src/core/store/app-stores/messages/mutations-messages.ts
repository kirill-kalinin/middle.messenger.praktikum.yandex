import { Mutations } from '../../../types';

const messagesMutations: Mutations = {
    addChat(state, payload) {
        console.log('Make some changes in state with payload', payload);
        return state;
    },
    removeChat(state, payload) {
        console.log('Make some changes in state with payload', payload);
        return state;
    }
};

export default messagesMutations;
