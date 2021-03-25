const optionsForApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  baseUrlForAuth: 'https://auth.nomoreparties.co',
  headers: {
    authorization: '856155f9-12e9-47dc-bda9-cdcb166629fd',
    'Content-Type': 'application/json'
  },
  headersForAuth: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  dir: {
    usersMe: '/users/me',
    cards: '/cards',
    likes: '/cards/likes',
    avatar: '/users/me/avatar',
    signIn: '/signin',
    signUp: '/signup',
  }
}

export default optionsForApi;

