function openModalWindow(window) {
    window.classList.add("popup_is-opened");
    document.addEventListener('keydown', function (e) {
		if(e.key === 27) {
            closeModalWindow(window)
        }
    })

}

function closeModalWindow(window) {
    if ( !window.className.includes("popup_is-opened") ) {
        window.classList.remove("popup_is-closed");
    }
    window.classList.remove("popup_is-opened");
    window.classList.add("popup_is-closed");
    document.removeEventListener('keydown', function (e) {
		if(e.key === 27) {
            closeModalWindow(window)
        }
    })
}

function openModalWindowImage(imagePopUp, image, link, name) {
    image.addEventListener('click', function (event) {
        const PopImage = document.querySelector('.popup__image'); 
        PopImage.src = link
        const PopText = document.querySelector('.popup__caption'); 
        PopText.textContent = name;
        
        if (!event.target.className.includes("card__like-button")) {
            if (event.target.className !== "card__delete-button") {
                openModalWindow(imagePopUp)
            }
        }
    });
}

export { openModalWindow, closeModalWindow, openModalWindowImage }