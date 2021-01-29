import Template from './error.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Error extends Block {
  constructor(props, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
