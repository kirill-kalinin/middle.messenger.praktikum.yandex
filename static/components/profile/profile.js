import Template from './profile.hbs.js';
import Block from '../../scripts/k-react/block.js';
export default class Profile extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=profile.js.map