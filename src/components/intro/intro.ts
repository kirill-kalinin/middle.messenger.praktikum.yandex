import Template from '../../../components/intro/intro.hbs.js';
import Block from '../../core/k-react/block.js';
import Router from '../../core/router/router.js';
import type { BlockProps } from '../../core/types.js';

export default class Intro extends Block {

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setProps({ animate: true });
      setTimeout(function() {
        (new Router()).go('/login');
      }, 3000);
    });
  }

  render() {
    return Template;
  }

}
