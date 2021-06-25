import Template from '../../../static/components/alert/alert.hbs.js';
import Block from '../../core/k-react/block';
import type { BlockProps } from '../../core/types';

export default class Alert extends Block {

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }

}
