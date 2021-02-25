import Page from '../../core/k-react/page.js';
import Alert from '../../components/alert/alert.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import Button from '../../components/button/button.js';
export default function createPage500() {
    const alert500 = new Alert({
        title: 'Код ошибки',
        code: '500',
        description: 'Попробуйте позже!'
    });
    const sidebar = new Sidebar({
        parent: 'alert',
        typeIsAlert: true,
        alert: ['Что-то пошло', 'не так!']
    });
    const button = new Button({
        text: 'Назад',
        additionClass: 'button_padding-wide alert__go-back-button',
        route: 'BACK'
    });
    return new Page({
        root: alert500,
        children: {
            sidebar: [sidebar, '.alert__sidebar', alert500],
            button: [button, '.alert__button-slot', alert500]
        },
        controller
    });
}
function controller() {
}
//# sourceMappingURL=500.js.map