import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import DummyService from '../../core/services/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';
export default function createPageProfileEditPassword() {
    const dummyService = new DummyService();
    const profile = new Profile({
        header: dummyService.getProfileHeaderData(),
        isEditPasswordMode: true,
        userPasswordFields: {
            oldPassword: {
                label: 'Старый пароль',
                value: 'фыв123abc',
                name: 'oldPassword',
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
        }
    });
    sidebarProfileMenuPreset.menuItems[2].active = true;
    const sidebar = new Sidebar(sidebarProfileMenuPreset);
    const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');
    const submitButton = new Button({
        text: 'Сохранить',
        additionClass: ''
    }, 'profile__button');
    return new Page({
        root: profile,
        children: {
            sidebar: [sidebar, '.profile__sidebar', profile],
            sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
            submitButton: [submitButton, '.profile__buttons', profile]
        },
        controller
    });
}
function controller() {
    const formHandler = new FormHandler();
    formHandler.handle();
}
//# sourceMappingURL=profile-edit-password.js.map