const regex = /^[а-яА-Яa-zA-ZЁё\-\s]*$/;

const hasInvalidInput = (formList) => {
    return formList.some((inputElement) => {
        if (isValid(inputElement) === "True") {
            return false
        }
        return true
    })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
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

const showError = (input, errorMessage, formErrorItem, validationConfig) => {
    input.classList.add(validationConfig.inputErrorClass);
    formErrorItem.textContent = errorMessage;
    formErrorItem.classList.add(validationConfig.errorClass);
};

const hideError = (input, formErrorItem, validationConfig) => {
    input.classList.remove(validationConfig.inputErrorClass);
    formErrorItem.classList.remove(validationConfig.errorClass);
    formErrorItem.textContent = "";
};

const checkInputValidity = (formInputList, formErrorItem, validationConfig) => {
    let res = isValid(formInputList);
    if (res === "True") {
        hideError(formInputList, formErrorItem, validationConfig);
    } else if (res === "False") {
        console.log("here1")
        showError(formInputList, formInputList.validationMessage, formErrorItem, validationConfig);
    } else {
        console.log("here")
        showError(formInputList, res, formErrorItem, validationConfig);
    }
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`);
        checkInputValidity(inputElement, errorElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

function enableValidation(validationConfig) {
    const formElementList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formElementList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    })
    
}

function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    console.log(formElement)
    console.log(buttonElement)

    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`);
        hideError(inputElement, errorElement, validationConfig);
    });
    if (buttonElement) {
        toggleButtonState(inputList, buttonElement, validationConfig);
    }
}


export { enableValidation, clearValidation }