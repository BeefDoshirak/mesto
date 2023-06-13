class Card {
    constructor({cardData, userData, handleCardClick}, templateSelector, api) {
      this._template = this._getCardTemplate(templateSelector);
      this._name = this._template.querySelector('.element__title');
      this._image = this._template.querySelector('.element__img');
      this._likeCounter = this._template.querySelector('.element__like-counter');
      this._handleCardClick = handleCardClick;
      this._data = cardData;
      this._name.textContent = cardData.name;
      this._image.src = cardData.link;
      this._image.alt = cardData.name;
      this._trashBtn = this._template.querySelector('.element__trash-btn');
      this._likeBtn = this._template.querySelector('.element__like-btn');
      this._api = api;
      this._id =cardData._id;
      this._cardOwner = cardData.owner._id;
      this._userID = userData._id;
      this._likesSum = cardData.likes.length;
      this._cardID = cardData._id;
      this._userData = userData;
    }
  

    _disableTrashBtn(){
      this._trashBtn.style.display = "none";
    }

    _getCardTemplate = (templateSelector) => {
      return templateSelector.content.querySelector(".element").cloneNode(true);
    }
  
    _deleteElement = (evt) => {
      evt.stopPropagation();
      this._api.deleteCard(this._id)
      .then(() => console.log('Удалено'))
      .catch((err) => console.log(`Что-то пошло не так ${err}`));
      this._template.remove();
    };
  
    _toggleLike = (evt) => {
      evt.stopPropagation();
      this._api.addLike(this._userData, this._cardID).then((res) => console.log(res));
      this._likeBtn.classList.toggle('element__like-btn_active');
    };
  
    _setEventListeners = () => {
      this._trashBtn.addEventListener('click', this._deleteElement);
      this._likeBtn.addEventListener('click', this._toggleLike);
      this._image.addEventListener('click', this._handleCardClick.bind(this.data));
    }
  
    generateCard = () => {
      this._setEventListeners();
      this._likeCounter.textContent = this._likesSum;
      if (this._cardOwner !== this.iserId){
        this._disableTrashBtn();
      }
      return this._template;
    }
  
  }
  
  export default Card;