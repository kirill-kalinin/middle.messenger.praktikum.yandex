import Template from '../../../components/message/message.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Message extends Block {
    constructor(props = {}, className = 'chat__message-item') {
        super('li', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=message.js.map