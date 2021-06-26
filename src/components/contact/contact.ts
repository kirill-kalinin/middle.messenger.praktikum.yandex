import Template from '../../../static/components/contact/contact.hbs.js';
import Block from '../../core/k-react/block';
import type { BlockProps } from '../../core/types';

export default class Contact extends Block {

    constructor(props: BlockProps = {}, className = 'chat-sidebar__contact') {
        super('li', className, props);
    }

    render(): string {
        return Template;
    }

}
