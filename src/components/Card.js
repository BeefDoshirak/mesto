class Card {
    constructor({cardData, userData, handleCardClick, handleTrashBtnClick}, templateSelector, api) {
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
      this._userId = userData._id;
      this._likesSum = cardData.likes.length;
      this._cardId = cardData._id;
      this._userData = userData;
      this._handleTrashBtnClick = handleTrashBtnClick;
    }
  

   _disableTrashBtn(){
     this._trashBtn.style.display = "none";
    }

    _getCardTemplate = (templateSelector) => {
      return templateSelector.content.querySelector(".element").cloneNode(true);
    }
  

  
    _toggleLike = (evt) => {
      evt.stopPropagation();
      if (this._likeBtn.classList.contains('element__like-btn_active')){
        this._api.deleteLike(this._userData, this._cardId).then((res) => {
          this._likesSum = res.likes.length
          this._likeCounter.textContent = this._likesSum;
        }).then(() => {
          this._likeBtn.classList.toggle('element__like-btn_active');
        }).catch((err) => console.log(`catch: ${err}`));;
      }else{
        this._api.putLike(this._userData, this._cardId).then((res) =>{
          this._likesSum = res.likes.length
          this._likeCounter.textContent = this._likesSum;
        }).then(() => {
          this._likeBtn.classList.toggle('element__like-btn_active');
        }).catch((err) => console.log(`catch: ${err}`));;
      }
    };
  
    _setEventListeners = () => {
      this._trashBtn.addEventListener('click', () => {
        this._handleTrashBtnClick(this.data, this._template);
      });
      this._likeBtn.addEventListener('click', this._toggleLike);
      this._image.addEventListener('click', this._handleCardClick.bind(this.data));
    }
  
    generateCard = () => {
      this._setEventListeners();
      this._likeCounter.textContent = this._likesSum;
     if (this._cardOwner !== this._userId){
      this._disableTrashBtn();
      }
      const hasTargetId = this._data.likes.some(like => like._id === this._userId);

      if (hasTargetId) {
        this._likeBtn.classList.toggle('element__like-btn_active');
      }
      return this._template;
    }
  
  }
  
  export default Card;