const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: '1b672ea5-50fb-43e7-92f6-8a26aeae5f47',
      'Content-Type': 'application/json'
    }
  }

const userInfo = () => { 
    return fetch(`${config.baseUrl}/users/me`,  {
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
}

const dowloadCards = () => { 
    return fetch(`${config.baseUrl}/cards`,  {
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
}

const editProfile = (newProfile) => { 
    return fetch(`${config.baseUrl}/users/me`,  {
        method: 'PATCH',
        headers: config.headers,
        body: newProfile
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
}

const addCard = (newCard) => { 
    return fetch(`${config.baseUrl}/cards`,  {
        method: 'POST',
        headers: config.headers,
        body: newCard
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
} 

const deleteCardApi = (cardId) => { 
    return fetch(`${config.baseUrl}/cards/${cardId}`,  {
        method: 'DELETE',
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
} 

const likeCard = (cardId) => { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,  {
        method: 'PUT',
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
} 

const unLikeCard = (cardId) => { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,  {
        method: 'DELETE',
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
} 

const avatarUpdate = (avatar) => { 
    return fetch(`${config.baseUrl}/users/me/avatar`,  {
        method: 'PATCH',
        headers: config.headers,
        body: avatar
      })
      .then((res) => {
        if (res.ok) {
            console.log(res)
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
} 

export { userInfo, dowloadCards, editProfile, 
    addCard, deleteCardApi, likeCard, unLikeCard, avatarUpdate }