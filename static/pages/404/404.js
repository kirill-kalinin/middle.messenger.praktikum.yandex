import DOMService from '../../scripts/k-react/dom-service.js';
import Error from '../../components/error/error.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';
document.addEventListener('DOMContentLoaded', function () {
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
    const DOM = new DOMService();
    DOM.attachComponent(document, '.err404-page', error404.element);
    DOM.attachComponent(error404, '.error__sidebar', sidebar.element);
    DOM.attachComponent(error404, '.error__button-slot', button.element);
});
//# sourceMappingURL=404.js.map