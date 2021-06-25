import Page from '../../core/k-react/page';
import Auth from '../../components/auth/auth';
import Form, { formLoginPreset } from '../../components/form/form';
import Sidebar, { sidebarLoginPreset } from '../../components/sidebar/sidebar';
import Button from '../../components/button/button';

export default function createPageLogin() {
  const auth = new Auth();

  const sidebar = new Sidebar(sidebarLoginPreset);

  const loginForm = new Form(formLoginPreset, 'fragment fragment_center');

  const buttonSubmit = new Button({
    text: 'Авторизоваться',
    additionClasses: 'form__submit'
  });

  return new Page({
    root: auth,
    children: {
      sidebar: [sidebar, '.auth__sidebar', auth],
      loginForm: [loginForm, '.auth__main-block', auth],
      buttonSubmit: [buttonSubmit, '.form__submit', loginForm]
    }
  });
}
