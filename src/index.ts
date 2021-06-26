import createPage404 from './pages/404/404';
import createPage500 from './pages/500/500';
import createPageChatActive from './pages/chat-active/chat-active';
import createPageChatSelect from './pages/chat-select/chat-select';
import createPageIntro from './pages/intro/intro';
import createPageLogin from './pages/login/login';
import createPageProfileEditAvatar from './pages/profile-edit-avatar/profile-edit-avatar';
import createPageProfileEditData from './pages/profile-edit-data/profile-edit-data';
import createPageProfileEditPassword from './pages/profile-edit-password/profile-edit-password';
import createPageProfileMain from './pages/profile-main/profile-main';
import createPageSignin from './pages/signin/signin';

import Router from './core/router/router';
import FormHandler from './core/form-handler';

const appRoutes = [
    ['/', createPageIntro],
    ['/login', createPageLogin],
    ['/signin', createPageSignin],
    ['/profile-edit-avatar', createPageProfileEditAvatar],
    ['/profile-edit-data', createPageProfileEditData],
    ['/profile-edit-password', createPageProfileEditPassword],
    ['/profile-main', createPageProfileMain],
    ['/chat-active', createPageChatActive],
    ['/chat-select', createPageChatSelect],
    ['/404', createPage404],
    ['/500', createPage500],
];

const router = new Router();

// eslint-disable-next-line prefer-spread
appRoutes.forEach(route => router.use.apply(router, route));
router.start();

const formHandler = new FormHandler();

formHandler.handleSubmit();
