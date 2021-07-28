import ImageUrlArrow from '../../../../static/images/arrow.svg';
import { BlockProps } from '../../../core/types';

export const profileSidebarButtonPreset: BlockProps = {
    isProfileSidebarButton: true,
    imageSrc: ImageUrlArrow,
    text: 'Назад к чатам',
    additionClass: 'profile__sidebar-button',
    route: '/chat-select'
};
