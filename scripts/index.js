const editBtn = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('.editPopup');
const editPopupCloseBtn = editPopup.querySelector('.popup__close-btn');
const editPopupForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__text_type_name');
const statusInput = editPopup.querySelector('.popup__text_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
const elementTemplate = document.getElementById('card');
const cardContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('.addPopup');
const addPopupCloseBtn = addPopup.querySelector('.popup__close-btn');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPhotoNameInput = addPopupForm.querySelector('.popup__text_type_name');
const addPhotoLinkInput = addPopupForm.querySelector('.popup__text_type_photo-link');
const imgPopup = document.querySelector('.imgPopup');
const closeImgPopup = imgPopup.querySelector('.popup__close-btn');
const image = imgPopup.querySelector('.popup__image');
const imageText = imgPopup.querySelector('.popup__img-text');


//открыть диалоговое окно:
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}
//закрыть диалоговое окно:
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

//открыть окно редактирования профиля:
editBtn.addEventListener('click', () => {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});
//закрыть окно редактирования профиля:
editPopupCloseBtn.addEventListener('click', () => {
    closePopup(editPopup);
});

//сохранить изменения профиля
editPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const status = statusInput.value;

    profileName.textContent = name;
    profileStatus.textContent = status;
    closePopup(editPopup);
});

closeImgPopup.addEventListener('click', () => {
    closePopup(imgPopup);
});

//добавить карточку элемента:
const addCard = (cardData) => {
    const cardElement = elementTemplate.content.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title');
    const cardImg = cardElement.querySelector('.element__img');

    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
//кнопка удаления элемента:
    const trashBtn = cardElement.querySelector('.element__trash-btn');
//кнопка лайка элемента    
    const likeBtn = cardElement.querySelector('.element__like-btn');

    //удалить элемент:
    const elementDelete = (event) => {
        event.stopPropagation();
        cardElement.remove();
    };

    //лайкнуть элемент:
    const elementLike = (event) => {
        event.stopPropagation();
        likeBtn.classList.toggle('element__like-btn_active');
    };

    //активация нажатием на кнопки карточки:
    trashBtn.addEventListener('click', elementDelete);

    likeBtn.addEventListener('click', elementLike);


    //открытие картинки нажатием:
    cardImg.addEventListener('click', () => {
        image.src = cardData.link;
        imageText.innerHTML = cardData.name;
        openPopup(imgPopup);
    });



    return cardElement;
}



//добавить карточку элемента в начало галереи:

const cardPlace = (cardElement) => {
    cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
    cardPlace(addCard(card));
});


//открыть окно пополнения галереи:
addBtn.addEventListener('click', () => {
    addPhotoNameInput.value = '';
    addPhotoLinkInput.value = '';
    openPopup(addPopup);
});

//закрыть окно пополнения галереи:
addPopupCloseBtn.addEventListener('click', () => {
    closePopup(addPopup);
});

//добавить новую карточку элемента в галерею:
const addPopupSubmit = (event) => {
    event.preventDefault();
    const name = addPhotoNameInput.value;
    const link = addPhotoLinkInput.value;

    const cardData = {
        name,
        link,
    }

    cardPlace(addCard(cardData));
    closePopup(addPopup);
};

addPopupForm.addEventListener('submit', addPopupSubmit);