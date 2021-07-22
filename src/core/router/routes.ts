import createPage404 from '../../pages/404/404';
import createPage500 from '../../pages/500/500';
import createPageChatActive from '../../pages/chat-active/chat-active';
import createPageChatSelect from '../../pages/chat-select/chat-select';
import createPageIntro from '../../pages/intro/intro';
import createPageLogin from '../../pages/login/login';
import createPageProfileEditAvatar from '../../pages/profile-edit-avatar/profile-edit-avatar';
import createPageProfileEditData from '../../pages/profile-edit-data/profile-edit-data';
import createPageProfileEditPassword from '../../pages/profile-edit-password/profile-edit-password';
import createPageProfileMain from '../../pages/profile-main/profile-main';
import createPageSignup from '../../pages/signup/signup';
import { AppRoutes } from '../types';

const appRoutes: AppRoutes = [
    ['/', createPageIntro],
    ['/login', createPageLogin],
    ['/signup', createPageSignup],
    ['/profile-edit-avatar', createPageProfileEditAvatar, true],
    ['/profile-edit-data', createPageProfileEditData, true],
    ['/profile-edit-password', createPageProfileEditPassword, true],
    ['/profile-main', createPageProfileMain, true],
    ['/chat-active', createPageChatActive, true],
    ['/chat-select', createPageChatSelect, true],
    ['/404', createPage404],
    ['/500', createPage500],
];

export default appRoutes;
