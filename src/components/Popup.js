export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _setCloseButton() {
        this._closePopupButton = this._popup.querySelector('.popup__close-btn')
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //открыть диалоговое окно:
    open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    };

//закрыть диалоговое окно:
close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    };


setEventListeners() {
    this._setCloseButton();
    this._closePopupButton.addEventListener('click', () => {
        this.close();
    });

    this._popup.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            this.close();
        }
    });
}
}