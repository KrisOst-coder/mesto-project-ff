const popUpEdit = document.querySelector(".popup_type_edit")
const buttonEdit = popUpEdit.querySelector(".popup__button")

const regex = /^[а-яА-Яa-zA-ZЁё\-\s]*$/;

const hasInvalidInput = (formList) => {
    return formList.some((inputElement) => {
        if (isValid(inputElement) === "True") {
            return false
        }
        return true
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('inactive__popup__button');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('inactive__popup__button');
    }
};

function isValid(input) {
    let inputString = input.value;
    if (input.validity.valid) {
        if (input.name === "url") {
            return "True"
        } else if (!inputString.match(regex)) {
            return input.dataset.errorMessage;
        } else {
            return "True"
        }
    }
    input.setCustomValidity("");
    return "False";
}

const showError = (input, errorMessage, formErrorItem) => {
    input.classList.add('form__input_type_error');
    formErrorItem.textContent = errorMessage;
    formErrorItem.classList.add('form__input-error_active');
};

const hideError = (input, formErrorItem) => {
    input.classList.remove('form__input_type_error');
    formErrorItem.classList.remove('form__input-error_active');
    formErrorItem.textContent = "";
};

const checkInputValidity = (formInputList, formErrorItem) => {
    let res = isValid(formInputList);
    if (res === "True") {
        hideError(formInputList, formErrorItem);
    } else if (res === "False") {
        console.log("here1")
        showError(formInputList, formInputList.validationMessage, formErrorItem);
    } else {
        console.log("here")
        showError(formInputList, res, formErrorItem);
    }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`);
        checkInputValidity(inputElement, errorElement);
        toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation(formElementList) {
    formElementList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    })
    
}

function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`);
        hideError(inputElement, errorElement);
    });
    toggleButtonState(inputList, buttonElement);
}


export { enableValidation, clearValidation }