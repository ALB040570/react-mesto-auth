import optionsForApi from './constants.js';
// класс Api

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._baseUrlForAuth = options.baseUrlForAuth;
    this._headers = options.headers;
    this._headersForAuth = options.headersForAuth;
    this._usersMe = options.dir.usersMe;
    this._cards = options.dir.cards;
    this._likes = options.dir.likes;
    this._avatar = options.dir.avatar;
    this._signIn = options.dir.signIn;
    this._signUp = options.dir.signUp;
  }
  //

  //Отправка на сервер данных регистрации пользоваателя
  register(email, password) {
    return fetch(this._baseUrlForAuth + this._signUp, {
      method: 'POST',
      headers: this._headersForAuth,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  }

  //Отправка на сервер данных для авторизации
  authorize(email, password) {
    return fetch(this._baseUrlForAuth + this._signIn, {
      method: 'POST',
      headers: this._headersForAuth,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  }

  // запрос для проверки валидности токена
  getContent(token) {
    return fetch(this._baseUrlForAuth + this._usersMe, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  }

  //Загрузка карточек с сервера
  getCards() {
    return fetch(this._baseUrl + this._cards, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  //Загрузка информации о пользователе с сервера
  getUsersInfo() {
    return fetch(this._baseUrl+this._usersMe, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  //Редактирование профиля
  patchUsersInfo(data) {
    return fetch(this._baseUrl+this._usersMe, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }


  //Добавление новой карточки
  postCard(data) {
    return fetch(this._baseUrl + this._cards, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._cards}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  //функция объединяет и вызывает методы обновления/снятия лайка
  changeLikeCardStatus(cardId, isLike) {
    const method = isLike?'PUT':'DELETE';
    return fetch(`${this._baseUrl}${this._likes}/${cardId}`, {
      method: method,
      headers: this._headers,
    })
    .then(this._checkResponse)
  }


  //Постановка лайка
  putLike(cardId) {
    return fetch(`${this._baseUrl}${this._likes}/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  //Cнятие лайка
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}${this._likes}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  //Обновление аватара пользователя
  patchAvatar(data) {
    return fetch(this._baseUrl+this._avatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
        })
    })
    .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}
const api = new Api(optionsForApi);

export default api;
