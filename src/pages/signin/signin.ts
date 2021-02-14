import Page from '../../core/k-react/page.js';
import FormHandler from '../../core/form-handler.js';
import Auth from '../../components/auth/auth.js';
import Form, { formSigninPreset } from '../../components/form/form.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', createPage);

function createPage() {
  const auth = new Auth({
    isHigh: true
  });

  const signinForm = new Form(formSigninPreset, 'fragment fragment_center');

  const sidebar = new Sidebar({
    parent: 'signin',
    typeIsPrompt: true,
    prompt: {
      question: 'Уже есть аккаунт?',
      link: {
        text: 'Авторизоваться!',
        href: '/pages/login/login.html'
      }
    }
  });

  const buttonSubmit = new Button({
    text: 'Зарегистрироваться',
    additionClasses: 'form__submit'
  });

  controlPage(new Page({
    root: [auth, '.signin-page'],
    sidebar: [sidebar, '.auth__sidebar', auth],
    signinForm: [signinForm, '.auth__main-block', auth],
    buttonSubmit: [buttonSubmit, '.form__submit', signinForm]
  }));
}

function controlPage(page: Page) {
  page.init();

  const formHandler = new FormHandler();
  formHandler.handle();
}
