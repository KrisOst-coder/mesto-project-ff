import '../styles/index.css';
import { deleteCard, likeFunc, createCard } from './card.js';
import { openModalWindow, closeModalWindow } from './modal.js';
import { enableValidation, clearValidation } from './validation.js'
import { userInfo, dowloadCards, editProfile, addCard, avatarUpdate } from './api.js'

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
const popImage = document.querySelector('.popup__image'); 
const popText = document.querySelector('.popup__caption'); 
const deleteCardPopUp = document.querySelector(".popup_agree_with_delete")
const deleteCardPopUpClose = document.querySelector(".delete__close")
const updateAvatarPopUp = document.querySelector(".popup_update_avatar")
const updateAvatarPopUpClose = document.querySelector(".avatar__close")

const formEditProfile = document.forms["edit-profile"];
const formAddCard = document.forms["new-place"];
const formEditAvatar = document.forms["update-avatar"];

const buttonElementAddCard = formAddCard.querySelector('.popup__button');
const buttonElementEditAvatar = formEditAvatar.querySelector('.popup__button');

console.log(buttonElementAddCard.disabled)
buttonElementAddCard.disabled = true;
buttonElementEditAvatar.disabled = true;

const popUpList = [editPopUp, newCardPopUp, imagePopUp, deleteCardPopUp, updateAvatarPopUp]
const popUpCloseList = [editPopUpClose, newPopUpClose, imagePopUpClose, deleteCardPopUpClose, updateAvatarPopUpClose]

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const userMe = await fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me',  {
    headers: {
        authorization: '1b672ea5-50fb-43e7-92f6-8a26aeae5f47',
        'Content-Type': 'application/json'
    }
  });
  
const dataUser = await userMe.json();
const userId = dataUser['_id'];

dowloadCards()
.then((data) => {
    data.forEach((element) => {
        cardsContainer.append(createCard(element, userId));
        imagePopUp.classList.add("popup_is-animated");
    })
})

userInfo()
.then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    avatarDOM.style['background-image'] = `url(${data.avatar})`;
})

newCardPopUp.classList.add("popup_is-animated");
editPopUp.classList.add("popup_is-animated");

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
        if (popUpCloseList[i] === editPopUpClose) {
            clearValidation(formEditProfile, validationConfig);
        } else if (popUpCloseList[i] === newPopUpClose)
        clearValidation(formAddCard, validationConfig);
        
    });
}

function setCloseModalByOverlay(popUpList) {
    popUpList.forEach(popup => {
        popup.addEventListener('click', function (event) {
            if ( event.target.classList.contains("popup") ) {
                closeModalWindow(popup);
            }
        })
    })
}

// форма профиля
const nameInput = formEditProfile.elements.name
const descriptionInputForm = formEditProfile.elements.description;
const submitbuttonEditProfile = formEditProfile.querySelector(".popup__button")

function handleProfileFormSubmit(evt) {
    submitbuttonEditProfile.textContent = "Сохранение..."
    submitbuttonEditProfile.disabled = false
    evt.preventDefault();
    const name = nameInput.value;
    const description = descriptionInputForm.value;
    editProfile(JSON.stringify({
        name: name,
        about: description
    }))
    profileName.textContent = name;
    profileDescription.textContent = description;
    submitbuttonEditProfile.textContent = "Сохранить";
    submitbuttonEditProfile.disabled = true;
    closeModalWindow(editPopUp);
}

function openImageModal(link, name) { 
    popImage.src = link
    popImage.alt = name;
    popText.textContent = name;
    openModalWindow(imagePopUp);   
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// форма карточек

const placeInput = formAddCard.elements["place-name"]
const linkInput = formAddCard.elements["url"]
const submitbuttonAddCard = formAddCard.querySelector(".popup__button")

function handleCardFormSubmit(evt) {
    submitbuttonAddCard.textContent = "Сохранение..."
    submitbuttonAddCard.disabled = false
    evt.preventDefault();
    addCard(JSON.stringify({
        name: placeInput.value,
        link: linkInput.value,
    }))
    .then((data) => {
        cardsContainer.prepend(createCard(data, userId));
        imagePopUp.classList.add("popup_is-animated");
    });

    imagePopUp.classList.add("popup_is-animated");
    submitbuttonAddCard.textContent = "Сохранить";
    submitbuttonAddCard.disabled = true;
    closeModalWindow(newCardPopUp);
    placeInput.value = "";
    linkInput.value = "";
}

formAddCard.addEventListener('submit', handleCardFormSubmit);
setCloseModalByOverlay([editPopUp, newCardPopUp, imagePopUp]);



// форма обновления аватара

const avatarChangeButton = document.querySelector(".profile__image")
const avatarDOM = document.querySelector(".profile__image")
const linkAvatarInput = formEditAvatar.elements.url;
const submitbuttonChangeAvatar = formEditAvatar.querySelector(".popup__button")

avatarChangeButton.addEventListener('click', function (event) {
    openModalWindow(updateAvatarPopUp);
}); 


function handleAvatarFormSubmit(evt) {
    submitbuttonChangeAvatar.textContent = "Сохранение..."
    submitbuttonChangeAvatar.disabled = false
    
    evt.preventDefault();
    // меняется но при обновлении страницы не сохраняется
    avatarUpdate(JSON.stringify({
        avatar: linkAvatarInput.value
    }))
    .then((res) => {
        avatarDOM.style['background-image'] = `url(${res.avatar})`;
        linkAvatarInput.value = "";
        submitbuttonChangeAvatar.textContent = "Сохранить";
        submitbuttonChangeAvatar.disabled = true;
        closeModalWindow(updateAvatarPopUp);
    })
    
}

formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);


const formElementList = [formEditProfile, formAddCard, formEditAvatar];

enableValidation(validationConfig)

export { openImageModal }



