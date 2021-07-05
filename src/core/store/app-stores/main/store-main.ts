import actions from './actions-main';
import mutations from './mutations-main';
import Store from '../../store';

const mainStore = new Store({
    actions,
    mutations,
    state: {
        userInfo: {
            id: null,
            first_name: null,
            second_name: null,
            display_name: null,
            login: null,
            email: null,
            phone: null,
            avatar: null
        }
    }
});

export default mainStore;
