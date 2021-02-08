import Template from '../../../components/profile/profile.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Profile extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
//# sourceMappingURL=profile.js.map