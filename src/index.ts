import createPage404 from './pages/404/404.js';
import createPage500 from './pages/500/500.js';
import createPageChatActive from './pages/chat-active/chat-active.js';
import createPageChatSelect from './pages/chat-select/chat-select.js';
import createPageIntro from './pages/intro/intro.js';
import createPageLogin from './pages/login/login.js';
import createPageProfileEditAvatar from './pages/profile-edit-avatar/profile-edit-avatar.js';
import createPageProfileEditData from './pages/profile-edit-data/profile-edit-data.js';
import createPageProfileEditPassword from './pages/profile-edit-password/profile-edit-password.js';
import createPageProfileMain from './pages/profile-main/profile-main.js';
import createPageSignin from './pages/signin/signin.js';

import Router from './core/k-react/router.js';

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
]

const router = new Router();

appRoutes.forEach(route => router.use.apply(router, route));
router.start();
