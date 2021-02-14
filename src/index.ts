import Page from './core/k-react/page.js';
import Intro from './components/intro/intro.js';

document.addEventListener('DOMContentLoaded', createPage);

function createPage() {
  const intro = new Intro({ animate: false });

  controlPage(new Page({
    root: [intro, '.index-page']
  }));
}

function controlPage(page: Page) {
  page.init();

  window.addEventListener('load', function() {
    const [ intro ] = page.blocks.root;
    intro.setProps({ animate: true })
    setTimeout(function() {
      window.location.href = "pages/login/login.html";
    }, 3000);
  });
}
