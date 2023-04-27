const editBtn = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('.profile_edit-form');
const formEditProfile = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__text_type_name');
const statusInput = editPopup.querySelector('.popup__text_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
const elementTemplate = document.getElementById('card');
const cardContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('.element_add-form');
const cardAddForm = addPopup.querySelector('.popup__form');
const PhotoNameInput = cardAddForm.querySelector('.popup__text_type_name');
const PhotoLinkInput = cardAddForm.querySelector('.popup__text_type_photo-link');
const imgPopup = document.querySelector('.element_open-card');
const image = imgPopup.querySelector('.popup__image');
const imageText = imgPopup.querySelector('.popup__img-text');
const closeButtons = document.querySelectorAll('.popup__close-btn');

//закрыть окно по нажатию Esc:
const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//открыть диалоговое окно:
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}
//закрыть диалоговое окно:
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
 
//закрыть кликом по overlay:
const closeOnOverlay = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', function (evt) {
            if (evt.currentTarget === evt.target) {
                closePopup(popupElement);
            }
        });
    });
};

closeOnOverlay();

//открыть окно редактирования профиля:
editBtn.addEventListener('click', () => {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});

//сохранить изменения профиля
formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const status = statusInput.value;

    profileName.textContent = name;
    profileStatus.textContent = status;
    closePopup(editPopup);
});

//добавить карточку элемента:
const addCard = (cardData) => {
    const cardElement = elementTemplate.content.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title');
    const cardImg = cardElement.querySelector('.element__img');

    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
//кнопка удаления элемента:
    const trashBtn = cardElement.querySelector('.element__trash-btn');
//кнопка лайка элемента    
    const likeBtn = cardElement.querySelector('.element__like-btn');

    //удалить элемент:
    const deleteElement = (event) => {
        event.stopPropagation();
        cardElement.remove();
    };

    //лайкнуть элемент:
    const toggleLike = (event) => {
        event.stopPropagation();
        likeBtn.classList.toggle('element__like-btn_active');
    };

    //активация нажатием на кнопки карточки:
    trashBtn.addEventListener('click', deleteElement);

    likeBtn.addEventListener('click', toggleLike);


    //открытие картинки нажатием:
    cardImg.addEventListener('click', () => {
        image.src = cardData.link;
        image.alt = cardData.name;
        imageText.textContent = cardData.name;
        openPopup(imgPopup);
    });



    return cardElement;
}



//добавить карточку элемента в начало галереи:

const postCard = (cardElement) => {
    cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
    postCard(addCard(card));
});


//открыть окно пополнения галереи:
addBtn.addEventListener('click', () => {
    openPopup(addPopup);
});


//добавить новую карточку элемента в галерею:
const addPopupSubmit = (event) => {
    event.preventDefault();
    const name = PhotoNameInput.value;
    const link = PhotoLinkInput.value;

    const cardData = {
        name,
        link,
    }
    PhotoNameInput.value = '';
    PhotoLinkInput.value = '';

    postCard(addCard(cardData));
    closePopup(addPopup);
};

cardAddForm.addEventListener('submit', addPopupSubmit);

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__text_type_invalid',
    errorClass: 'popup__text_error',
}

enableValidation(config);