const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.places__list'); 

function deleteFunc(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

function cardMake (cardInfo, deleteFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').src = cardInfo['link'];
    cardElement.querySelector('.card__image').alt = cardInfo['name'];
    cardElement.querySelector('.card__title').textContent = cardInfo['name'];
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteFunc(deleteButton)
    });
    return cardElement
}

initialCards.forEach((element) => cards.append(cardMake(element, deleteFunc)))


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
