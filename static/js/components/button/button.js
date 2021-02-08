import Template from '../../../components/button/button.hbs.js';
import Block from '../../core/k-react/block.js';
export default class Button extends Block {
    constructor(props = {}, className = 'fragment') {
        super('div', className, props);
    }
    render() {
        return Template;
    }
}
export const profileSidebarButtonPreset = {
    isProfileSidebarButton: true,
    linkBehavior: true,
    link: '../chat-select/chat-select.html',
    imageSrc: '../../images/arrow.svg',
    text: 'Назад к чатам',
    additionClass: 'profile__sidebar-button'
};
//# sourceMappingURL=button.js.map