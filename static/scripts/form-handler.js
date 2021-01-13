document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (!form) {
    return;
  }

  const avatarInput = form.querySelector('.avatar-upload__input');
  if (avatarInput) {
    avatarInput.addEventListener('change', function() {
      document.querySelector('.avatar-upload__alert').style.visibility = "hidden";

      if (this.files.length) {
        document.querySelector('.avatar-uplaod__title').innerText = 'Файл загружен';
        document.querySelector('.avatar-upload__filename').innerText = this.files[0].name;
        document.querySelector('.avatar-upload__filename').style.display = "block";
        document.querySelector('.avatar-upload__label').style.display = "none";
      }
    });
  }

  const attachToMessage = form.querySelector('.chat__form-button_attach');
  if (attachToMessage) {
    const attachInputsBlock = form.querySelector('.chat__attach');
    attachToMessage.addEventListener('click', function() {
      attachInputsBlock.classList.toggle('chat__attach_visible');
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (e.target.name === 'avatar-upload' && !formData.get('avatar')) {
      document.querySelector('.avatar-upload__alert').style.visibility = "visible";
      return;
    }

    console.log(e.target.name, Object.fromEntries(formData.entries()));

    // Эмуляция успешного входа/регистрации
    if (e.target.name === 'login' || e.target.name === 'signin') {
      const redirect = confirm('Данные формы выведены в консоль. Перейти на страницу выбора собеседника?');
      if (redirect) {
        window.location.href = "chat-select.html";
      }
    }
  })
});
