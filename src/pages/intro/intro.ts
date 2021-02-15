import Page from '../../core/k-react/page.js';
import Intro from '../../components/intro/intro.js';

export default function createPageIntro() {
  const intro = new Intro({ animate: false });

  return new Page({
    root: intro,
    controller
  });
}

function controller(page: Page) {
  window.addEventListener('load', function() {
    page.root.setProps({ animate: true });
    setTimeout(function() {
      page.router.go('/login');
    }, 3000);
  });
}
