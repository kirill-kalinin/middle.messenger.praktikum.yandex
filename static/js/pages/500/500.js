import Page from '../../core/k-react/page.js';
import Error from '../../components/error/error.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';
document.addEventListener('DOMContentLoaded', createPage);
function createPage() {
    const error500 = new Error({
        title: 'Код ошибки',
        code: '500',
        description: 'Попробуйте позже!'
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
    controlPage(new Page({
        root: [error500, '.err500-page'],
        sidebar: [sidebar, '.error__sidebar', error500],
        button: [button, '.error__button-slot', error500]
    }));
}
function controlPage(page) {
    page.init();
}
//# sourceMappingURL=500.js.map