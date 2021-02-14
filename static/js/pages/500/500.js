import Page from '../../core/k-react/page.js';
import Error from '../../components/error/error.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';
export default function createPage500() {
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
    return new Page({
        root: error500,
        children: {
            sidebar: [sidebar, '.error__sidebar', error500],
            button: [button, '.error__button-slot', error500]
        },
        controller
    });
}
function controller() {
}
//# sourceMappingURL=500.js.map