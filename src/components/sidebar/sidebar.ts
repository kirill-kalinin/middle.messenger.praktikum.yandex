import Template from '../../../components/sidebar/sidebar.hbs.js';
import Block from '../../core/k-react/block.js';
import type { BlockProps, SidebarMenu } from '../../core/types.js';

export default class Sidebar extends Block {

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }

}

export const sidebarProfileMenuPreset: SidebarMenu = {
  parent: 'profile',
  typeIsMenu: true,
  menuItems: [
    { link: '/profile-edit-avatar', text: 'Изменить аватар' },
    { link: '/profile-edit-data', text: 'Изменить данные' },
    { link: '/profile-edit-password', text: 'Изменить пароль' },
    { link: '/login', text: 'Выйти' }
  ]
};

export const sidebarLoginPreset: BlockProps = {
  parent: 'login',
  typeIsPrompt: true,
  prompt: {
    question: 'Еще нет аккаунта?',
    link: {
      text: 'Создать новый!',
      href: '/signin'
    }
  }
}

export const sidebarSigninPreset: BlockProps = {
  parent: 'signin',
  typeIsPrompt: true,
  prompt: {
    question: 'Уже есть аккаунт?',
    link: {
      text: 'Авторизоваться!',
      href: '/login'
    }
  }
}
