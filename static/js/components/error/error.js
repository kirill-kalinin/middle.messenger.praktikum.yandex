import Template from '../../../components/error/error.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Error extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=error.js.map