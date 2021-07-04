import actions from './actions-main';
import mutations from './mutations-main';
import Store from '../../store';

const mainStore = new Store({
    actions,
    mutations,
    state: {
        userId: null
    }
});

export default mainStore;
