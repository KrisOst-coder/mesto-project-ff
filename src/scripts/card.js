import { openModalWindow, closeModalWindow, setCloseModalByOverlay  } from './modal.js';
import { openImageModal } from './index.js'

function deleteCard(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

function likeFunc(likeButton) {
    if (likeButton.classList.contains("card__like-button_is-active")) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
        likeButton.classList.add('card__like-button_is-active');
    }
}

function createCard(cardTemplate, imagePopUp, cardInfo, deleteCard, likeFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const image = cardElement.querySelector('.card__image');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    image.addEventListener('click', () => openImageModal(cardInfo.link, cardInfo.name));
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCard(deleteButton)
    });
    const likeButton = cardElement.querySelector('.card__like-button');
    imagePopUp.classList.add("popup_is-animated");
    likeButton.addEventListener('click', function () {
        likeFunc(likeButton);
    });

    return cardElement
}


export { deleteCard, likeFunc, createCard }