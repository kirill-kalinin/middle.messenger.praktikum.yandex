import Template from './intro.hbs.js';
import Block from '../../core/k-react/block';
import Router from '../../core/router/router';
import type { BlockProps } from '../../core/types';

export default class Intro extends Block {

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    componentDidMount(): void {
        window.addEventListener('load', () => {
            this.setProps({ animate: true });
            setTimeout(function() {
                (new Router()).go('/login');
            }, 3000);
        });
    }

    render(): string {
        return Template;
    }

}
