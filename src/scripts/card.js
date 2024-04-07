import { openModalWindow, closeModalWindow  } from './modal.js';
import { userInfo, dowloadCards, editProfile, addCard, deleteCardApi, likeCard, unLikeCard } from './api.js'
import { openImageModal } from './index.js'

const cardTemplate = document.querySelector('#card-template').content;
const deleteCardPopUp = document.querySelector(".popup_agree_with_delete");

function deleteCardfromDOM(card) {
    card.remove();
}

function pushLike(element, likeButton, userId) {
    if (element.likes.some((elem) => elem._id === userId)) {
        likeButton.classList.remove('card__like-button_is-active');
        return true
    } else {
        likeButton.classList.add('card__like-button_is-active');
        return false
    }
}

function createCard(element, userId) {
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
        const deleteCardPopUpButton = document.querySelector(".popup__button_agree_with_delete");
        deleteButton.addEventListener('click', function () {
            openModalWindow(deleteCardPopUp);
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
    likeButton.addEventListener('click', function () {
        if (pushLike(element, likeButton, userId)) {
            unLikeCard(element["_id"])
            .then((res) => {
                cardElement.querySelector('.likes-count').textContent = res.likes.length;
                console.log("вот так", res)
                element = res
        })
        } else {
            likeCard(element["_id"])
            .then((res) => {
                cardElement.querySelector('.likes-count').textContent = res.likes.length;
                console.log("вот так", res)
                element = res
            })
        }
    });

    return cardElement
}

export { createCard }