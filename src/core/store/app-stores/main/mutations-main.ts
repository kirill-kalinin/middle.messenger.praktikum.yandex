import { Mutations } from '../../../types';

const mainMutations: Mutations = {
    setUserInfo(_state, payload) {
        return { userInfo: payload };
    }
};

export default mainMutations;
