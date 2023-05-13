class Card {
    constructor(cardData, templateSelector, openByClick) {
      this._template = this._getCardTemplate(templateSelector);
      this._title = this._template.querySelector('.element__title');
      this._image = this._template.querySelector('.element__img');
      this._openByClick = openByClick;
      this._data = cardData;
      this._title.textContent = cardData.name;
      this._image.src = cardData.link;
      this._image.alt = cardData.name;
      this._trashBtn = this._template.querySelector('.element__trash-btn');
      this._likeBtn = this._template.querySelector('.element__like-btn');
    }
  
    _getCardTemplate = (templateSelector) => {
      return templateSelector.content.querySelector(".element").cloneNode(true);
    }
  
    _deleteElement = (evt) => {
      evt.stopPropagation();
      this._template.remove();
    };
  
    _toggleLike = (evt) => {
      evt.stopPropagation();
      this._likeBtn.classList.toggle('element__like-btn_active');
    };
  
    _openCardByClick = () => {
      this._openByClick(this._data);
    }
  
    _setEventListeners = () => {
      this._trashBtn.addEventListener('click', this._deleteElement);
      this._likeBtn.addEventListener('click', this._toggleLike);
      this._image.addEventListener('click', this._openCardByClick);
    }
  
    createCard = () => {
      this._setEventListeners();
      return this._template;
    }
  
  }
  
  export default Card;