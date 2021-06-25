import Page from '../../core/k-react/page.js';
import Auth from '../../components/auth/auth.js';
import Form, { formSigninPreset } from '../../components/form/form.js';
import Sidebar, { sidebarSigninPreset } from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

export default function createPageSignin() {
  const auth = new Auth({
    isHigh: true
  });

  const signinForm = new Form(formSigninPreset, 'fragment fragment_center');

  const sidebar = new Sidebar(sidebarSigninPreset);

  const buttonSubmit = new Button({
    text: 'Зарегистрироваться',
    additionClasses: 'form__submit'
  });

  return new Page({
    root: auth,
    children: {
      sidebar: [sidebar, '.auth__sidebar', auth],
      signinForm: [signinForm, '.auth__main-block', auth],
      buttonSubmit: [buttonSubmit, '.form__submit', signinForm]
    }
  });
}
