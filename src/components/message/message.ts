import Template from './message.hbs.js';
import Block from '../../core/k-react/block';
import type { BlockProps } from '../../core/types';

export default class Message extends Block {

    constructor(props: BlockProps = {}, className = 'chat__message-item') {
        super('li', className, props);
    }

    render(): string {
        return Template;
    }

}
