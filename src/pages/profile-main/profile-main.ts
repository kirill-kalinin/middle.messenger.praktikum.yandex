import Page from '../../core/k-react/page.js';
import DummyService from '../../core/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';

export default function createPageProfileMain() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isMainInfoMode: true,
    userData: dummyService.getProfileUserData()
  });

  const sidebar = new Sidebar(sidebarProfileMenuPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  return new Page({
    root: profile,
    children: {
      sidebar: [sidebar, '.profile__sidebar', profile],
      sidebarButton: [sidebarButton, '.sidebar__button-slot', sidebar]
    },
    controller
  });
}

function controller() {

}
