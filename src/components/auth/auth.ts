import Template from '../../../components/auth/auth.hbs.js';
import Block from '../../core/k-react/block.js';

export default class Auth extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
