import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { config } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import '../pages/index.css'


const editBtn = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('.popup_edit-profile');
const formEditProfile = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__text_type_name');
const statusInput = editPopup.querySelector('.popup__text_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
const elementTemplate = document.getElementById('card');
const cardContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-btn');
const addPopup = document.querySelector('.popup_add-card');
const cardAddForm = addPopup.querySelector('.popup__form');
const photoNameInput = cardAddForm.querySelector('.popup__text_type_name');
const photoLinkInput = cardAddForm.querySelector('.popup__text_type_photo-link');
const imgPopup = document.querySelector('.popup_card-opened');
const image = imgPopup.querySelector('.popup__image');
const imageText = imgPopup.querySelector('.popup__img-text');
const closeButtons = document.querySelectorAll('.popup__close-btn');

const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68/',
    headers: {
        authorization: 'da0a089a-98ac-46e3-a2b1-f3ddd493176f',
    }
})

const createCard = (cardData, userData) => {
    const card = new Card({cardData, userData, handleCardClick: () => {
        popupWithImage.open({link: cardData.link, name: cardData.name});
    }}, elementTemplate, api);
    return card.generateCard();
}

let cardList

api.getAppInfo().then(([cards, userData]) => {
    cardList = new Section({
        renderer: (cardData, userData) => {
            cardList.addItem(cardElement);
        },
    },
    cardContainer
    );
    cardList.renderItems(cards);
}).catch((err) => console.log(`catch: ${err}`));


const popupWithImage = new PopupWithImage('.popup_card-opened');
const userInfo = new userInfo({nameSelector: '.profile__name', infoSelector: '.profile__subtitle'});

const info = api.getUserInfo().then((res) => {
    userInfo.setUserInfo({name: res.name, info: res.about})
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
    });
};

const handleEditPopupSubmit = (formData) => {
    userInfo.setUserInfo({name: formData.name, info: formData.status});
    api.editUserInfo(formData.name, formData.status);
  };

const editProfilePopup = new PopupWithForm('.popup_edit-profile', handleEditPopupSubmit);
const addCardPopup = new PopupWithForm('.popup_add-card', handleAddPopupSubmit);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

const profileValidator = new FormValidator(config, editPopup);
const cardValidator = new FormValidator(config, addPopup);

profileValidator.enableValidation();
cardValidator.enableValidation();



editBtn.addEventListener('click', (evt) => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name
    statusInput.value = userData.info
    editProfilePopup.open();
});


addBtn.addEventListener('click', () => {
    addCardPopup.open();
});
