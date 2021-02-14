import Template from '../../../components/profile/profile.hbs.js';
import Block from '../../core/k-react/block.js';
import type { BlockProps } from '../../core/types.js';

export default class Profile extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
