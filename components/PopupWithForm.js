import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input"); // Store inputs as a class field
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this._form.reset(); // Clear inputs only after successful submission
    });
  }

  close() {
    super.close(); // Do NOT reset the form here, so data is preserved if the popup is closed unexpectedly
  }
}

export default PopupWithForm;
