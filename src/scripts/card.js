import { openModalWindow, closeModalWindow } from './modal.js';

const editPopUp = document.querySelector(".popup_type_edit");
const newCardPopUp = document.querySelector(".popup_type_new-card");

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

function handleCloseByOverlay(popUpList) {
    popUpList.forEach(popup => {
        popup.addEventListener('click', function (event) {
            if ( event.target.classList.contains("popup") ) {
                closeModalWindow(popup);
            }
        })
    })
}

function openModalWindowImage(imagePopUp, image, link, name) {
    image.addEventListener('click', function (event) {
        const popImage = document.querySelector('.popup__image'); 
        popImage.src = link
        popImage.alt = name;
        const popText = document.querySelector('.popup__caption'); 
        popText.textContent = name;

        openModalWindow(imagePopUp);
    });

    handleCloseByOverlay([editPopUp, newCardPopUp, imagePopUp]);
}

function createCard(cardTemplate, imagePopUp, cardInfo, deleteCard, likeFunc, openModalWindowImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const image = cardElement.querySelector('.card__image');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    image.addEventListener('click', () => openModalWindowImage(imagePopUp, cardElement, cardInfo.link, cardInfo.name));
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


export { deleteCard, likeFunc, createCard, openModalWindowImage }