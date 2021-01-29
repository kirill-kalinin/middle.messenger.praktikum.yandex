document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

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
