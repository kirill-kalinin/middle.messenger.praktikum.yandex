window.addEventListener('load', function() {
  document.querySelector('.intro__text').classList.add('intro__text_animated');
  setTimeout(function() {
    window.location.href = "html/login.html";
  }, 3000);
});
