class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._settings.inputErrorClass);
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove(this._settings.inputErrorClass);
    }
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleSubmitButtonState();
  }

  resetValidation() {
    this._formElement.reset();

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      if (errorElement) {
        errorElement.textContent = "";
      }
      inputElement.classList.remove(this._settings.inputErrorClass);
    });

    this._toggleSubmitButtonState();
  }
}

export default FormValidator;
