import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
