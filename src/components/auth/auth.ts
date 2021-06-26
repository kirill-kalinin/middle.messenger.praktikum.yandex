import Template from '../../../static/components/auth/auth.hbs.js';
import Block from '../../core/k-react/block';
import type { BlockProps } from '../../core/types';

export default class Auth extends Block {

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    render(): string {
        return Template;
    }

}
