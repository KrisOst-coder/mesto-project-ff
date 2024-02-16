import '../styles/index.css';
import { initialCards } from './cards.js';
import { deleteCard, likeFunc, createCard, openModalWindowImage } from './card.js';
import { openModalWindow, closeModalWindow } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list'); 
const buttonOpenProfileEditPopup = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector(".popup_type_edit")
const newCard = document.querySelector('.profile__add-button'); 
const newCardPopUp = document.querySelector(".popup_type_new-card");
const imagePopUp = document.querySelector(".popup_type_image")
const editPopUpClose = document.querySelector('.edit__close'); 
const newPopUpClose = document.querySelector('.new__close');
const imagePopUpClose = document.querySelector('.image__close');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

const popUpList = [editPopUp, newCardPopUp, imagePopUp]
const popUpCloseList = [editPopUpClose, newPopUpClose, imagePopUpClose]

initialCards.forEach((element) => cardsContainer.append(createCard(cardTemplate, imagePopUp, element, deleteCard, likeFunc, openModalWindowImage)));

buttonOpenProfileEditPopup.addEventListener('click', function (event) {
    openModalWindow(editPopUp);
    inputName.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}); 

newCard.addEventListener('click', function (event) {
    openModalWindow(newCardPopUp);
});

for (let i = 0; i < popUpList.length; ++i) {
    popUpCloseList[i].addEventListener('click', function (event) {
        closeModalWindow(popUpList[i]);
    });
}

// форма профиля
const formEditProfile = document.forms["edit-profile"];

const nameInput = formEditProfile.elements.name
const descriptionInputForm = formEditProfile.elements.description;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const description = descriptionInputForm.value;

    profileName.textContent = name;
    profileDescription.textContent = description;

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
    placeInput.value = "";
    linkInput.value = "";
}

formAddCard.addEventListener('submit', handleCardFormSubmit);


