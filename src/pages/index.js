import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { config } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import '../pages/index.css'

import {editBtn,
    editPopup,
    nameInput,
    statusInput,
    elementTemplate,
    cardContainer,
    addBtn,
    addPopup,
    updateAvatarPopup,
    editAvatarBtn
    } from '../utils/constants.js';

const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization:'da0a089a-98ac-46e3-a2b1-f3ddd493176f',
    }
})
const handleAddPopupSubmit = (formData) => {
    const name = formData.name;
    const link = formData['photo-link'];

    const cardData = {
        name,
        link,
    }
    api.getCardInfo(name, link).then(([res, userData]) => {
        const cardElement = createCard(res, userData);
        cardList.addNewItem(cardElement);
    }).catch((err) => console.log(`catch: ${err}`));
};
const handleEditAvatarPopupSubmit = (formData) => {
    api.editUserAvatar(formData['photo-avatar-link']).then(() => {
        userInfo.setUserPhoto({photoAlt: "avatar", photoLink: formData['photo-avatar-link']})
    }).catch((err) => console.log(`catch: ${err}`));
  };


const handleEditPopupSubmit = (formData) => {
    api.editUserInfo(formData.name, formData.status).then(() => {
        userInfo.setUserInfo({name: formData.name, info: formData.status});
    }).catch((err) => console.log(`catch: ${err}`));
  };



  const handleDeleteConfirm = (cardData, temp) => {
    api.deleteCard(cardData)
    .then(()=> {
        this._deleteCard(temp)
       //temp.remove()
    })
    .catch((err) => console.log(`Что-то пошло не так ${err}`));
}

const createCard = (cardData, userData) => {
    const card = new Card({cardData, userData, handleCardClick: () => {
        popupWithImage.open({link: cardData.link, name: cardData.name});
    }, handleTrashBtnClick: (data,temp) => {
        confirmPopup.open();
        confirmPopup.getCardData(cardData,temp);
    }}, elementTemplate, api);
    return card.generateCard();
}

let cardList

api.getAppInfo().then(([cards, userData]) => {
    cardList = new Section({
        renderer: (cardData) => {
            const cardElement = createCard(cardData, userData);
            cardList.addItem(cardElement);
        },
    },
    cardContainer
    );
    cardList.renderItems(cards);
    userInfo.setUserAvatar({avatar: userData.avatar});
    userInfo.setUserInfo({name: userData.name, info: userData.about});

}).catch((err) => console.log(`catch: ${err}`));


const popupWithImage = new PopupWithImage('.popup_card-opened');
const confirmPopup = new ConfirmPopup('.popup_confirm-changes', handleDeleteConfirm);
confirmPopup.setEventListeners();
const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__subtitle', avatarSelector: '.profile__avatar'});

//function renderBtn(button, isLoading, origText, loadingText) {
 //   if (isLoading) {
 //       button.textContent = loadingText
   // } else {
 //       button.textContent = origText
 //   }
//}


const editProfilePopup = new PopupWithForm('.popup_edit-profile', handleEditPopupSubmit);
const addCardPopup = new PopupWithForm('.popup_add-card', handleAddPopupSubmit);
const editAvatarPopup = new PopupWithForm('.popup_update-avatar', handleEditAvatarPopupSubmit);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

const profileValidator = new FormValidator(config, editPopup);
const cardValidator = new FormValidator(config, addPopup);
const editAvatarValidator = new FormValidator(config, updateAvatarPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();
editAvatarValidator.enableValidation();


editBtn.addEventListener('click', (evt) => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name
    statusInput.value = userData.info
    editProfilePopup.open();
});


addBtn.addEventListener('click', () => {
    addCardPopup.open();
});

editAvatarBtn.addEventListener('click', () => {
    editAvatarPopup.open();
});