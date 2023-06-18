export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector,}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
        this._avatarElement = document.querySelector(avatarSelector);

    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            info: this._infoElement.textContent,
            avatar: this._avatarElement.src,
        };
    }
    setUserInfo({ name, info}) {
        this._nameElement.textContent = name;
        this._infoElement.textContent = info;
    }

    setUserAvatar({avatar}) {
      this._avatarElement.src = avatar;
        //this._nameElement.textContent = name;
        //this._infoElement.textContent = info;
    }

    setUserPhoto({photoAlt, photoLink}){
        this._avatarElement.alt = photoAlt;
        this._avatarElement.src = photoLink;
    }

}