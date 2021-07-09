import { BlockProps, UserInfo } from '../../core/types';
import ImageUrlAvatarPlaceholder from 'url:../../../static/images/avatar-placeholder.svg';

const AVATAR_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources/';

export default class ProfileDataService {

    public static getHeader(userInfo: UserInfo): BlockProps {
        return { 
            name: userInfo.display_name || userInfo.first_name,
            avatarSrc: userInfo.avatar 
                ? `${AVATAR_BASE_URL}${userInfo.avatar}` 
                : ImageUrlAvatarPlaceholder
        };
    }

    public static configureMainForm(userInfo: UserInfo): BlockProps {
        return {
            email: {
                label: 'Почта',
                value: userInfo.email,
                inputName: 'email',
                inputType: 'text',
                validationKey: 'email',
                validationText: 'Введите корректный адрес почты'
            },
            login: {
                label: 'Логин',
                value: userInfo.login,
                inputName: 'login',
                inputType: 'text',
                validationKey: 'login',
                validationText: 'От 5 до 20 латинских букв или цифр, первый символ - буква'
            },
            firstName: {
                label: 'Имя',
                value: userInfo.first_name,
                inputName: 'first_name',
                inputType: 'text',
                validationKey: 'name',
                validationText: 'Допускается от 2 до 20 букв в имени'
            },
            secondName: {
                label: 'Фамилия',
                value: userInfo.second_name,
                inputName: 'second_name',
                inputType: 'text',
                validationKey: 'name',
                validationText: 'Допускается от 2 до 20 букв в фамилии'
            },
            displayName: {
                label: 'Имя в чате',
                value: userInfo.display_name,
                inputName: 'display_name',
                inputType: 'text',
                validationKey: 'name',
                validationText: 'Допускается от 2 до 20 букв для имени в чате'
            },
            phone: {
                label: 'Телефон',
                value: userInfo.phone,
                inputName: 'phone',
                inputType: 'tel',
                validationKey: 'tel',
                validationText: 'Введите корректный номер телефона'
            }
        };
    }

    public static getPasswordForm(): BlockProps {
        return {
            oldPassword: {
                label: 'Старый пароль',
                value: '',
                name: '',
                validationKey: 'password',
                validationText: 'Введите от 8 до 25 букв или цифр',
            },
            newPassword: {
                label: 'Новый пароль',
                value: '',
                name: 'newPassword',
                validationKey: 'password',
                validationText: 'Введите от 8 до 25 букв или цифр',
                equality: true
            },
            repeat: {
                label: 'Повторите пароль',
                value: '',
                name: '',
                validationText: 'Пароли не совпадают',
                equality: true
            }
        };
    }

}
