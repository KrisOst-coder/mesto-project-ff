import { openModalWindow, closeModalWindow  } from './modal.js';
import { userInfo, dowloadCards, editProfile, addCard, deleteCardApi, likeCard, unLikeCard } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;
const deleteCardPopUp = document.querySelector(".popup_agree_with_delete");

function deleteCardfromDOM(card) {
    card.remove();
}

function pushLike(element, likeButton, cardElement) {
    if (Array.from(likeButton.classList).includes('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
        unLikeCard(element["_id"])
        .then((res) => {
            cardElement.querySelector('.likes-count').textContent = res.likes.length;
    })
    } else {
        likeButton.classList.add('card__like-button_is-active');
        likeCard(element["_id"])
        .then((res) => {
            cardElement.querySelector('.likes-count').textContent = res.likes.length;
        })
    }
}

function createCard(element, userId, openImageModal) {
    const name = element.name
    const link = element.link
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    image.alt = name;
    image.src = link;
    cardElement.querySelector('.card__title').textContent = name;
    image.addEventListener('click', () => openImageModal(link, name));
    cardElement.querySelector('.likes-count').textContent = element.likes.length;
    if (userId === element.owner["_id"]) {
        console.log("in")
        const deleteButton = cardElement.querySelector('.card__delete-button');
        const deleteCardPopUpClose = document.querySelector(".delete__close")
        const deleteCardPopUpButton = document.querySelector(".popup__button_agree_with_delete");
        deleteButton.addEventListener('click', function () {
            openModalWindow(deleteCardPopUp, deleteCardPopUpClose);
            deleteCardPopUpButton.addEventListener("click", () => {
                deleteCardApi(element["_id"], cardElement)
                .then((res) => {
                    deleteCardfromDOM(cardElement)
                    closeModalWindow(deleteCardPopUp)
                }) 
            })
        });
    } else {
        // скроем кнопку удаления не нашего поста с помощью css
        cardElement.querySelector('.card__delete-button').style.display = "none"
    }
    const likeButton = cardElement.querySelector('.card__like-button');
    if (element.likes.some((elem) => elem._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => pushLike(element, likeButton, cardElement));

    return cardElement
}

export { createCard }