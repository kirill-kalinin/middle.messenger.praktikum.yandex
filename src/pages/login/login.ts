import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import Auth from '../../components/auth/auth.js';
import Form, { formLoginPreset } from '../../components/form/form.js';
import Sidebar, { sidebarLoginPreset } from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

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
    },
    controller
  });
}

function controller() {
  const formHandler = new FormHandler();
  formHandler.handle();
}
