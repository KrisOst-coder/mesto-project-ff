function handleCloseByEsc(e) {
    if(e.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModalWindow(openedModal);
    }
} 

function openModalWindow(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleCloseByEsc)
}

function closeModalWindow(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleCloseByEsc)
}

export { openModalWindow, closeModalWindow }