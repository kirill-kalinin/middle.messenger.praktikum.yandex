import DOMService from '../../scripts/k-react/dom-service.js';
import Auth from '../../components/auth/auth.js';
import Form, { formSigninPreset } from '../../components/form/form.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', function() {
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

  const DOM = new DOMService();

  DOM.attachComponent(document, '.signin-page', auth);
  DOM.attachComponent(auth, '.auth__sidebar', sidebar);
  DOM.attachComponent(auth, '.auth__main-block', signinForm);
  DOM.attachComponent(signinForm, '.form__submit', buttonSubmit);
});
