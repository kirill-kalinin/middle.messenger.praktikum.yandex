import Page from '../../core/k-react/page';
import Alert from '../../components/alert/alert';
import Sidebar from '../../components/sidebar/sidebar';
import Button from '../../components/button/button';

import { RouterDirections } from '../../core/router/router';

export default function createPage404(): Page {
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
        additionClass: 'button_padding-wide alert__go-back-button',
        route: RouterDirections.BACK
    });

    return new Page({
        root: alert404,
        children: {
            sidebar: [sidebar, '.alert__sidebar', alert404],
            button: [button, '.alert__button-slot', alert404]
        }
    });
}
