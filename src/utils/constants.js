
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__text_type_invalid',
    errorClass: 'popup__text_error',
};

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
const confirmPopup = document.querySelector('.popup_confirm-changes');
const updateAvatarPopup = document.querySelector('.popup_update-avatar');

export {editBtn,
editPopup,
nameInput,
statusInput,
elementTemplate,
cardContainer,
addBtn,
addPopup,
confirmPopup,
updateAvatarPopup
}