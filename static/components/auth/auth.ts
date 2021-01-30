import Template from './auth.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Auth extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
