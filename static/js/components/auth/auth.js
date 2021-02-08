import Template from '../../../components/auth/auth.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Auth extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=auth.js.map