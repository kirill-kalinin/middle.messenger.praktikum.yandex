import { Mutations } from '../../../types';

const mutations: Mutations = {
    addChat(state, payload) {
        console.log('Make some changes in state with payload', payload);
        return state;
    },
    removeChat(state, payload) {
        console.log('Make some changes in state with payload', payload);
        return state;
    }
};

export default mutations;
