import './styles/index.css';
import { initialCards } from './cards.js'

const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.places__list'); 
const edit = document.querySelector('.profile__edit-button'); 
const editPopUp = document.getElementsByClassName("popup popup_type_edit")
const newCard = document.querySelector('.profile__add-button'); 
const newCardPopUp = document.getElementsByClassName("popup popup_type_new-card")
const image = document.getElementsByClassName('places__item card'); 
const imagePopUp = document.getElementsByClassName("popup popup_type_image")
const editPopUpClose = document.getElementsByClassName('popup__close edit__close'); 
const newPopUpClose = document.getElementsByClassName('popup__close new__close');
const imagePopUpClose = document.getElementsByClassName('popup__close image__close');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const descriptionName = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');


function deleteFunc(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

function likeFunc(likeButton) {
    const listItem = likeButton.closest('.card__like-button');
    if (listItem.className.includes(" ")) {
        listItem.className = "card__like-button";
    } else {
        listItem.classList.add('card__like-button_is-active');
    }
}

function cardMake (cardInfo, deleteFunc, likeFunc, openModalWindow) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').src = cardInfo['link'];
    cardElement.querySelector('.card__image').alt = cardInfo['name'];
    cardElement.querySelector('.card__title').textContent = cardInfo['name'];
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteFunc(deleteButton)
    });
    const likeButton = cardElement.querySelector('.card__like-button');

    likeButton.addEventListener('click', function () {
        likeFunc(likeButton);
    });

    return cardElement
}

function openModalWindow(window, windowClose) {
    if (window.className.includes("popup_is-closed")) {
        window.classList.remove("popup_is-closed");
    }
    window.classList.add("popup_is-opened");

    windowClose.addEventListener('click', function (event) {
        window.classList.remove("popup_is-opened");
        window.classList.add("popup_is-closed");

    });
    document.onclick = function(event) {
        if ( event.target.className.includes("popup ") ) {
            window.classList.remove("popup_is-opened");
            window.classList.add("popup_is-closed");
        }
    };
    document.addEventListener('keypress', function (e) {
		if(e.keyCode === 27) {
            window.classList.remove("popup_is-opened");
            window.classList.add("popup_is-closed");
        }
	});
    
}

initialCards.forEach((element) => cards.append(cardMake(element, deleteFunc, likeFunc, openModalWindow)))

edit.addEventListener('click', function (event) {
    openModalWindow(editPopUp[0], editPopUpClose[0]);
    inputName.placeholder = profileName.innerHTML;
    descriptionName.placeholder = profileDescription.innerHTML;

}); 

newCard.addEventListener('click', function (event) {
    openModalWindow(newCardPopUp[0], newPopUpClose[0]);
});

for (let i = 0; i < image.length; ++i) {
    image[i].addEventListener('click', function (event) {
        const PopImage = document.querySelector('.popup__image'); 
        PopImage.src = initialCards[i].link
        const PopText = document.querySelector('.popup__caption'); 
        PopText.textContent = initialCards[i].name;
        if (!event.target.className.includes("card__like-button")) {
            if (event.target.className !== "card__delete-button") {
                openModalWindow(imagePopUp[0], imagePopUpClose[0])
            }
        }
    });
}

// форма профиля
const formElement1 = document.forms["edit-profile"];

const nameInput = formElement1.elements.name
const jobInput = formElement1.elements.description

function handleForm1Submit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;

    editPopUp[0].style.display = "none";
}

formElement1.addEventListener('submit', handleForm1Submit);

// форма карточек

const formElement2 = document.forms["new-place"];

const placeInput = formElement2.elements["place-name"]
const linkInput = formElement2.elements.link

function handleForm2Submit(evt) {
    evt.preventDefault();
    const item = {
        name: placeInput.value,
        link: linkInput.value,
      };
    cards.append(cardMake(item, deleteFunc, likeFunc, openModalWindow));

    newCardPopUp[0].style.display = "none";
}

formElement2.addEventListener('submit', handleForm2Submit);
