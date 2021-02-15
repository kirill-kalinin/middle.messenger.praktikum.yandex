import Template from '../../../components/sidebar/sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Sidebar extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
export const sidebarProfileMenuPreset = {
    parent: 'profile',
    typeIsMenu: true,
    menuItems: [
        { link: '../profile-edit-avatar/profile-edit-avatar.html', text: 'Изменить аватар' },
        { link: '../profile-edit-data/profile-edit-data.html', text: 'Изменить данные' },
        { link: '../profile-edit-password/profile-edit-password.html', text: 'Изменить пароль' },
        { link: '../login/login.html', text: 'Выйти' }
    ]
};
export const sidebarLoginPreset = {
    parent: 'login',
    typeIsPrompt: true,
    prompt: {
        question: 'Еще нет аккаунта?',
        link: {
            text: 'Создать новый!',
            href: '/signin'
        }
    }
};
export const sidebarSigninPreset = {
    parent: 'signin',
    typeIsPrompt: true,
    prompt: {
        question: 'Уже есть аккаунт?',
        link: {
            text: 'Авторизоваться!',
            href: '/login'
        }
    }
};
//# sourceMappingURL=sidebar.js.map