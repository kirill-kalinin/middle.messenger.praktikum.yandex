import { Mutations } from '../../../types';

const mainMutations: Mutations = {
    setUserInfo(_state, payload) {
        return { userInfo: payload };
    },
    setAuthStatus(_state, payload) {
        return { isLoggedIn: payload };
    }
};

export default mainMutations;
