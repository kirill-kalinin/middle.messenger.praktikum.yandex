import Template from '../../../components/error/error.hbs.js';
import Block from '../../core/k-react/block.js';
import type { BlockProps } from '../../core/types.js';

export default class Error extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
