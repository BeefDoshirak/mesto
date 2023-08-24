import Popup from './Popup.js';

export default class ConfirmPopup extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._submitCallback = submitCallback;
        this._submitBtn = this._popup.querySelector('.popup__submit-btn');
    }
    getCardData(cardData, temp){
        this._cardID = cardData._id;
        this._temp = temp;
    }

    async handleSubmit(event) {
        event.preventDefault();
        const originalText = this._submitBtn.textContent;
        try {
            this._submitBtn.textContent = 'Удаление...';
            await this.handleSubmit(this._cardID, this._temp);
            this.close();
        } finally {this._submitBtn.textContent = originalText;}
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitBtn.addEventListener('click', (evt) => {
            this._submitCallback(this._cardID, this._temp);
            this.close();
        });
    }
}