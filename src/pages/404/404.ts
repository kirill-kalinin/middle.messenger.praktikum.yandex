import Page from '../../core/k-react/page.js';
import Alert from '../../components/alert/alert.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

export default function createPage404() {
  const alert404 = new Alert({
    title: 'Код ошибки',
    code: '404',
    description: 'Такой страницы нет!'
  });

  const sidebar = new Sidebar({
    parent: 'alert',
    typeIsAlert: true,
    alert: ['Что-то пошло', 'не так!']
  });

  const button = new Button({
    text: 'Назад',
    additionClass: 'button_padding-wide alert__go-back-button'
  });

  return new Page({
    root: alert404,
    children: {
      sidebar: [sidebar, '.alert__sidebar', alert404],
      button: [button, '.alert__button-slot', alert404]
    },
    controller
  });
}

function controller(page: Page) {
  if (!page.blocks) {
    throw new Error('Ошибка в настройке блоков страницы');
  }
  const buttonBlock = page.blocks.button[0];
  const buttonElement = (buttonBlock as Button).element.querySelector('.button');
  if (!buttonElement) {
    throw new Error('Ошибка в шаблоне блокa Button');
  }
  buttonElement.addEventListener('click', function() {
    page.router.back();
  });
}
