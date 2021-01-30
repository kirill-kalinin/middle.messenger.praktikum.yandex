import Template from './sidebar.hbs.js';
import Block from '../../scripts/k-react/block.js';
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
//# sourceMappingURL=sidebar.js.map