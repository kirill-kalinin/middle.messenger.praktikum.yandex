import Template from '../../../components/message/message.hbs.js';
import Block from '../../core/k-react/block.js';
import type { BlockProps } from '../../core/types.js';

export default class Message extends Block {
  constructor(props: BlockProps = {}, className = 'chat__message-item') {
    super('li', className, props);
  }

  render() {
    return Template;
  }
}
