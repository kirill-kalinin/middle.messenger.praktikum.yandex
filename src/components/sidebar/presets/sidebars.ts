import { BlockProps, SidebarMenu } from '../../../core/types';

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
            href: '/signup'
        }
    }
};

export const sidebarSigninPreset: BlockProps = {
    parent: 'signup',
    typeIsPrompt: true,
    prompt: {
        question: 'Уже есть аккаунт?',
        link: {
            text: 'Авторизоваться!',
            href: '/login'
        }
    }
};
