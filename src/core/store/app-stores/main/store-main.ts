import actions from './actions-main';
import mutations from './mutations-main';
import Store from '../../store';
import { MainStoreParams } from '../../../types';

class MainStore extends Store {
    constructor(params: MainStoreParams) {
        super(params);
    }
}

const mainStore = new MainStore({
    actions,
    mutations,
    state: {
        userInfo: {
            id: null,
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            phone: '',
            avatar: null
        },
        contacts: [],
        activeContactId: null
    }
});

export default mainStore;
