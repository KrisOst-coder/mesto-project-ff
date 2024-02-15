function deleteCard(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

function likeFunc(likeButton) {
    const listItem = likeButton.closest('.card__like-button');
    if (listItem.classList.contains("card__like-button_is-active")) {
        listItem.classList.remove('card__like-button_is-active');
    } else {
        listItem.classList.add('card__like-button_is-active');
    }
}

function createCard(cardTemplate, imagePopUp, cardInfo, deleteCard, likeFunc, openModalWindowImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCard(deleteButton)
    });
    const likeButton = cardElement.querySelector('.card__like-button');
    imagePopUp.classList.add("popup_is-animated");
    likeButton.addEventListener('click', function () {
        likeFunc(likeButton);
    });
    openModalWindowImage(imagePopUp, cardElement, cardInfo.link, cardInfo.name);
    return cardElement
}



export { deleteCard, likeFunc, createCard }