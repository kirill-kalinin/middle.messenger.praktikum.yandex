import DOMService from '/scripts/k-react/dom-service.js';
import Intro from '/components/intro/intro.js';

document.addEventListener('DOMContentLoaded', function() {
  const intro = new Intro({ animate: false });

  const DOM = new DOMService();

  DOM.attachComponent(document, ".index-page", intro);

  window.addEventListener('load', function() {
    intro.setProps({ animate: true })
    setTimeout(function() {
      window.location.href = "pages/login/login.html";
    }, 3000);
  });  
});
