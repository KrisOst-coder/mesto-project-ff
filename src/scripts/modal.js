const editPopUp = document.querySelector(".popup_type_edit");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const imagePopUp = document.querySelector(".popup_type_image")

function handleCloseByEsc(e, window) {
    if(e.key === 'Escape') {
        closeModalWindow(window)
    }
} 

function openModalWindow(window) {
    window.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleCloseByEsc(window))
}

function closeModalWindow(window) {
    if ( !window.classList.contains("popup_is-opened") ) {
        window.classList.remove("popup_is-closed");
    }
    window.classList.remove("popup_is-opened");
    window.classList.add("popup_is-closed");
    document.removeEventListener('keydown', handleCloseByEsc)
}

export { openModalWindow, closeModalWindow }