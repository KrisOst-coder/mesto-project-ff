import '../styles/index.css';
import { initialCards } from './cards.js';
import { deleteCard, likeFunc, createCard } from './card.js';
import { openModalWindow, closeModalWindow, openModalWindowImage } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list'); 
const edit = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector(".popup_type_edit")
const newCard = document.querySelector('.profile__add-button'); 
const newCardPopUp = document.querySelector(".popup_type_new-card");
const imagePopUp = document.querySelector(".popup_type_image")
const editPopUpClose = document.querySelector('.edit__close'); 
const newPopUpClose = document.querySelector('.new__close');
const imagePopUpClose = document.querySelector('.image__close');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const descriptionName = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

const popUpList = [editPopUp, newCardPopUp, imagePopUp]
const popUpCloseList = [editPopUpClose, newPopUpClose, imagePopUpClose]

initialCards.forEach((element) => cardsContainer.append(createCard(cardTemplate, imagePopUp, element, deleteCard, likeFunc, openModalWindowImage)))
const image = document.querySelectorAll(".places__item");

edit.addEventListener('click', function (event) {
    openModalWindow(editPopUp);
    inputName.value = profileName.textContent;
    descriptionName.value = profileDescription.textContent;
}); 

newCard.addEventListener('click', function (event) {
    openModalWindow(newCardPopUp);
});

for (let i = 0; i < popUpList.length; ++i) {
    popUpCloseList[i].addEventListener('click', function (event) {
        closeModalWindow(popUpList[i]);
    });
}

popUpList.forEach(popup => {
    popup.addEventListener('click', function (event) {
        if ( event.target.className.includes("popup ") ) {
            closeModalWindow(popup);
        }
    })
})

// форма профиля
const formEditProfile = document.forms["edit-profile"];

const nameInput = formEditProfile.elements.name
const jobInput = formEditProfile.elements.description
const namePlace = document.querySelector('.profile__title');
const descriptionPlace = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    namePlace.textContent = name;
    descriptionPlace.textContent = job;

    closeModalWindow(editPopUp);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// форма карточек

const formAddCard = document.forms["new-place"];

const placeInput = formAddCard.elements["place-name"]
const linkInput = formAddCard.elements.link

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const item = {
        name: placeInput.value,
        link: linkInput.value,
    };
    cardsContainer.prepend(createCard(cardTemplate, imagePopUp, item, deleteCard, likeFunc, openModalWindowImage));
    closeModalWindow(newCardPopUp);
}

formAddCard.addEventListener('submit', handleCardFormSubmit);
