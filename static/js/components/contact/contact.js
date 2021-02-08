import Template from '../../../components/contact/contact.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Contact extends Block {
    constructor(props = {}, className = 'chat-sidebar__contact') {
        super('li', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=contact.js.map