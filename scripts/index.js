const editBtn = document.querySelector('.profile__edit-btn');
const editPopup = document.querySelector('.popup');
const editPopupCloseBtn = editPopup.querySelector('.popup__close-btn');
const editPopupForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__text_name');
const statusInput = editPopup.querySelector('.popup__text_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');


editBtn.addEventListener('click', () => {
    editPopup.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});
editPopupCloseBtn.addEventListener('click', () => {
    editPopup.classList.remove('popup_open');
});


editPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const status = statusInput.value;

    profileName.textContent = name;
    profileStatus.textContent = status;
    editPopup.classList.remove('popup_open');
});