class Card {
    constructor({cardData, handleCardClick}, templateSelector) {
      this._template = this._getCardTemplate(templateSelector);
      this._name = this._template.querySelector('.element__title');
      this._image = this._template.querySelector('.element__img');
      this._handleCardClick = handleCardClick;
      this._data = cardData;
      this._name.textContent = cardData.name;
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
  
    _setEventListeners = () => {
      this._trashBtn.addEventListener('click', this._deleteElement);
      this._likeBtn.addEventListener('click', this._toggleLike);
      this._image.addEventListener('click', this._handleCardClick.bind(this.data));
    }
  
    generateCard = () => {
      this._setEventListeners();
      return this._template;
    }
  
  }
  
  export default Card;