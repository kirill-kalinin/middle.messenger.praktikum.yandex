import Template from './message.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Message extends Block {
  constructor(props, className = 'chat__message-item') {
    super('li', className, props);
  }

  render() {
    return Template;
  }
}
