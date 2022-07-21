class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headersWithJwt(),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headersWithJwt(),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headersWithJwt(),
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headersWithJwt(),
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headersWithJwt(),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headersWithJwt(),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(Id, isLiked) {
    return isLiked ? this.addLike(Id) : this.deleteLike(Id);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headersWithJwt(),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  avatarUpdate(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headersWithJwt(),
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

   _headersWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers};
  }
}



export const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    "Content-Type": "application/json",
  },
});
