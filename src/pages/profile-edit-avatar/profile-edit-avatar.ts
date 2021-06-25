import Page from '../../core/k-react/page';
import DummyService from '../../core/services/dummy-service';
import Profile from '../../components/profile/profile';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar';
import Button, { profileSidebarButtonPreset } from '../../components/button/button';
import cloneDeep from '../../utils/mydash/clone-deep/clone-deep';

export default function createPageProfileEditAvatar() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isAvatarUploadMode: true
  });

  const sidebarPreset = cloneDeep(sidebarProfileMenuPreset);
  sidebarPreset.menuItems[0].active = true;
  const sidebar = new Sidebar(sidebarPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  const uploadButton = new Button({
    text: 'Изменить',
    additionClass: ''
  }, 'profile__avatar-upload-button');

  return new Page({
    root: profile,
    children: {
      sidebar: [sidebar, '.profile__sidebar', profile],
      sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar],
      uploadButton: [uploadButton, '.profile__avatar-upload-button-wrapper', profile]
    }
  });
}
