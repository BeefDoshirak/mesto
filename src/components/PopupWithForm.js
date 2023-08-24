import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._submitCallback = submitCallback;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
        this._submitButton = this._formElement.querySelector('.popup__submit-btn');

    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    
    close() {
        super.close();
        this._formElement.reset();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const originalText = this._submitBtn.textContent;
        try {
            this._submitBtn.textContent = 'Сохранение...';
            await this.handleSubmit(this._getInputValues());
            this.close();
        } finally {this._submitBtn.textContent = originalText;}
    }

    
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }
}