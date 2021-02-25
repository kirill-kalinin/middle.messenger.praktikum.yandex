import Template from '../../../components/button/button.hbs.js';
import Block from '../../core/k-react/block.js';
import type { BlockProps } from '../../core/types.js';

export default class Button extends Block {

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  render() {
    return Template;
  }

}

export const profileSidebarButtonPreset = {
  isProfileSidebarButton: true,
  imageSrc: '../../images/arrow.svg',
  text: 'Назад к чатам',
  additionClass: 'profile__sidebar-button',
  route: '/chat-select'
};
