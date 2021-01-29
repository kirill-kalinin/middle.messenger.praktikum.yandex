import Template from './intro.hbs.js';
import Block from '../../scripts/k-react/block.js';

export default class Intro extends Block {
  constructor(props, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }
}
