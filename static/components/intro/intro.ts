import Template from './intro.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Intro extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
