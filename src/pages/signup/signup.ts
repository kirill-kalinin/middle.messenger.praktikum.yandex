import Page from '../../core/k-react/page';
import Auth from '../../components/auth/auth';
import Form from '../../components/form/form';
import { formSigninPreset } from '../../components/form/presets/auth-forms';
import Sidebar from '../../components/sidebar/sidebar';
import { sidebarSigninPreset } from '../../components/sidebar/presets/sidebars';
import Button from '../../components/button/button';

export default function createPageSignup(): Page {
    const auth = new Auth({
        isHigh: true
    });

    const signupForm = new Form(formSigninPreset, 'fragment fragment_center');

    const sidebar = new Sidebar(sidebarSigninPreset);

    const buttonSubmit = new Button({
        text: 'Зарегистрироваться',
        additionClasses: 'form__submit'
    });

    return new Page({
        root: auth,
        children: {
            sidebar: [sidebar, '.auth__sidebar', auth],
            signupForm: [signupForm, '.auth__main-block', auth],
            buttonSubmit: [buttonSubmit, '.form__submit', signupForm]
        }
    });
}
