export default class DummyService {

  fetchContacts(): Array<Contact> {
    return [{
      id: '1',
      link: '../chat-active/chat-active.html',
      avatar: '/images/avatar-placeholder.svg',
      name: 'Олег',
      message: 'Можно сегодня попробовать еще раз',
      counter: 1,
      date: '10:49',
      readed: false
    }, {
      id: '2',
      link: '../chat-active/chat-active.html',
      avatar: '/images/avatar-placeholder.svg',
      name: 'Киноклуб',
      message: 'Вы: стикер',
      counter: 0,
      date: '12:00',
      readed: true
    }, {
      id: '3',
      link: '../chat-active/chat-active.html',
      avatar: '/images/avatar-placeholder.svg',
      name: 'Павел',
      message: 'Начал собирать первые 10, все нормально',
      counter: 2,
      date: '15:12',
      readed: false
    }, {
      id: '4',
      link: '../chat-active/chat-active.html',
      avatar: '/images/avatar-placeholder.svg',
      name: 'Игорь',
      message: 'Вы: Хорошо',
      counter: 0,
      date: 'Среда',
      readed: true
    }, {
      id: '5',
      link: '../chat-active/chat-active.html',
      avatar: '/images/avatar-placeholder.svg',
      name: 'Евгения',
      message: 'Спсаибо',
      counter: 0,
      date: 'Апрель',
      readed: true
    }];
  }

  fetchMessages() {
    return [{
      isOwn: true,
      isImage: true,
      isReaded: true,
      imgSrc: 'https://picsum.photos/200',
      text: `Lorem ipsum dolor sit amet`,
      date: '12:02  |  17.11.20 '
    }, {
      isOwn: false,
      isImage: false,
      isReaded: false,
      imgSrc: '',
      text: `Lorem ipsum — классический текст-«рыба»
      (условный, зачастую бессмысленный текст-заполнитель, вставляемый
      в макет страницы). Является искажённым отрывком из философского
      трактата Марка Туллия Цицерона «О пределах добра и зла»,
      написанного в 45 году до н. э. на латинском языке.`,
      date: '12:10  |  17.11.20 '
    }, {
      isOwn: false,
      isImage: true,
      isReaded: false,
      imgSrc: 'https://picsum.photos/200',
      text: ``,
      date: '12:18  |  17.11.20 '
    }, {
      isOwn: true,
      isImage: false,
      isReaded: true,
      imgSrc: '',
      text: `Хорошо`,
      date: '12:22  |  17.11.20 '
    }];
  }

  getActiveContactId() {
    return '4';
  }

  getProfileHeaderData() {
    return { 
      name: 'Иван',
      avatarSrc: '../../images/avatar-placeholder.svg'
    }
  }

  getProfileUserData() {
    return {
      email: {
        label: 'Почта',
        value: 'user@ya.ru',
        inputName: 'email',
        inputType: 'text',
        validationKey: 'email',
        validationText: 'Введите корректный адрес почты'
      },
      login: {
        label: 'Логин',
        value: 'ivanivanov',
        inputName: 'login',
        inputType: 'text',
        validationKey: 'login',
        validationText: 'От 5 до 20 латинских букв или цифр, первый символ - буква'
      },
      firstName: {
        label: 'Имя',
        value: 'Иван',
        inputName: 'first_name',
        inputType: 'text',
        validationKey: 'name',
        validationText: 'Допускается от 2 до 20 букв в имени'
      },
      secondName: {
        label: 'Фамилия',
        value: 'Иванов',
        inputName: 'second_name',
        inputType: 'text',
        validationKey: 'name',
        validationText: 'Допускается от 2 до 20 букв в фамилии'
      },
      displayName: {
        label: 'Имя в чате',
        value: 'Иван',
        inputName: 'display_name',
        inputType: 'text',
        validationKey: 'name',
        validationText: 'Допускается от 2 до 20 букв для имени в чате'
      },
      phone: {
        label: 'Телефон',
        value: '+7 (777) 777 77 77',
        inputName: 'phone',
        inputType: 'tel',
        validationKey: 'tel',
        validationText: 'Введите корректный номер телефона'
      }
    }
  }

}
