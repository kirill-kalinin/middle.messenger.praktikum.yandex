import Page from '../../core/k-react/page.js';
import Error from '../../components/error/error.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';

export default function createPage404() {
  const error404 = new Error({
    title: 'Код ошибки',
    code: '404',
    description: 'Такой страницы нет!'
  });

  const sidebar = new Sidebar({
    parent: 'error',
    typeIsAlert: true,
    alert: ['Что-то пошло', 'не так!']
  });

  const button = new Button({
    linkBehavior: true,
    link: '../../index.html',
    text: 'Назад',
    additionClass: 'button_padding-wide error__go-back-button'
  });

  return new Page({
    root: error404,
    children: {
      sidebar: [sidebar, '.error__sidebar', error404],
      button: [button, '.error__button-slot', error404]
    },
    controller
  });
}

function controller() {

}
