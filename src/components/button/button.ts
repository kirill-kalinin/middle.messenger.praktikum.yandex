import Template from './button.hbs.js';
import Block from '../../core/k-react/block';
import type { BlockProps } from '../../core/types';
import ImageUrlArrow from 'url:../../../static/images/arrow.svg';

export default class Button extends Block {

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    render(): string {
        return Template;
    }

}

export const profileSidebarButtonPreset = {
    isProfileSidebarButton: true,
    imageSrc: ImageUrlArrow,
    text: 'Назад к чатам',
    additionClass: 'profile__sidebar-button',
    route: '/chat-select'
};
