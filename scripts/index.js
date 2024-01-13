const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.places__list'); 

function delete_func(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

function cardMake (card_info) {
    let cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').src = card_info['link'];
    cardElement.querySelector('.card__title').textContent = card_info['name'];
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        delete_func(deleteButton)
    });
    return cardElement
}

for (let i = 0; i < initialCards.length; i++) {
    cards.append(cardMake(initialCards[i]));
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
