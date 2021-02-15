import Template from '../../../components/alert/alert.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Alert extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=alert.js.map