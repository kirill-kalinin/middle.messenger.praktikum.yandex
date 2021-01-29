import DOMService from '../../scripts/k-react/dom-service.js';
import DummyService from '../../scripts/dummy-service.js';
import Profile from '../../components/profile/profile.js';
import Sidebar, { sidebarProfileMenuPreset } from '../../components/sidebar/sidebar.js';
import Button, { profileSidebarButtonPreset } from '../../components/button/button.js';

document.addEventListener('DOMContentLoaded', function() {
  const dummyService = new DummyService();

  const profile = new Profile({
    header: dummyService.getProfileHeaderData(),
    isMainInfoMode: true,
    userData: dummyService.getProfileUserData()
  });

  const sidebar = new Sidebar(sidebarProfileMenuPreset);

  const sidebarButton = new Button(profileSidebarButtonPreset, 'fragment fragment_center');

  const DOM = new DOMService();

  DOM.attachComponent(document, '.profile-main-page', profile);
  DOM.attachComponent(profile, '.profile__sidebar', sidebar);
  DOM.attachComponent(sidebar, '.sidebar__button-slot', sidebarButton);
});
