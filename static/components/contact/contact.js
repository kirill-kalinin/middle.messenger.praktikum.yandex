import Template from './contact.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Contact extends Block {
  constructor(props, className = 'chat-sidebar__contact') {
    super('li', className, props);
  }

  render() {
    return Template;
  }
}
