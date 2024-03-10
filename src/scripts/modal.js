function handleCloseByEsc(e, window) {
    if(e.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        closeModalWindow(openedModal);
    }
} 

function openModalWindow(window) {
    window.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleCloseByEsc)
}

function closeModalWindow(window) {
    window.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleCloseByEsc)
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

export { openModalWindow, closeModalWindow, setCloseModalByOverlay }