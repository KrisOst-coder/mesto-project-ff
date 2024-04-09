import { enableValidation, clearValidation } from './validation.js'

function handleCloseByEsc(e) {
    if(e.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModalWindow(openedModal);
    }
} 

function openModalWindow(popup, popupClose) {
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleCloseByEsc)
    popupClose.addEventListener('click', function (event) {
        closeModalWindow(popup);
        clearValidation(popup);
    });
}

function closeModalWindow(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleCloseByEsc)
}

export { openModalWindow, closeModalWindow }