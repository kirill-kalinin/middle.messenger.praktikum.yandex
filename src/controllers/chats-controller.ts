import BaseController from './base-controller';
import ChatsAPI from '../api/chats-api';
import mainStore from '../core/store/app-stores/main/store-main';
import mainActions from '../core/store/app-stores/main/actions-main';

const chatsAPI = new ChatsAPI();

export default class ChatsController extends BaseController {

}
