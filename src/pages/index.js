import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';

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

const popupWithImage = new PopupWithImage('.popup_card-opened');
const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__subtitle'});

const createCard = (cardData) => {
    const card = new Card({cardData, handleCardClick: () => {
        popupWithImage.open({link: cardData.link, name: cardData.name});
    }}, elementTemplate);
    return card.generateCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardList.addItem(cardElement);
    },
},
cardContainer
);

cardList.renderItems();

const handleAddPopupSubmit = (formData) => {
    const name = formData.name;
    const link = formData['photo-link'];

    const cardData = {
        name,
        link,
    }

    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
};

const handleEditPopupSubmit = (formData) => {
    userInfo.setUserInfo({name: formData.name, info: formData.status})
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
