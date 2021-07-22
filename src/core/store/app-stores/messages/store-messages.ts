import actions from './actions-messages';
import mutations from './mutations-messages';
import Store from '../../store';
import { MessagesStoreParams } from '../../../types';

class MessagesStore extends Store {
    constructor(params: MessagesStoreParams) {
        super(params);
    }
}

const messagesStore = new MessagesStore({
    actions,
    mutations,
    state: {}
});

export default messagesStore;
