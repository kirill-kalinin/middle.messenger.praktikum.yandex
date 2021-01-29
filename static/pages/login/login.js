import DOMService from '../../scripts/k-react/dom-service.js';
import Auth from '../../components/auth/auth.js';
import Form, { formLoginPreset } from '../../components/form/form.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', function() {
  const auth = new Auth();

  const loginForm = new Form(formLoginPreset, 'fragment fragment_center');

  const sidebar = new Sidebar({
    parent: 'login',
    typeIsPrompt: true,
    prompt: {
      question: 'Еще нет аккаунта?',
      link: {
        text: 'Создать новый!',
        href: '/pages/signin/signin.html'
      }
    }
  });

  const buttonSubmit = new Button({
    text: 'Авторизоваться',
    additionClasses: 'form__submit'
  });

  const DOM = new DOMService();

  DOM.attachComponent(document, '.login-page', auth);
  DOM.attachComponent(auth, '.auth__sidebar', sidebar);
  DOM.attachComponent(auth, '.auth__main-block', loginForm);
  DOM.attachComponent(loginForm, '.form__submit', buttonSubmit);
});
