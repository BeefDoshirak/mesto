export default class Section {
    constructor({renderer}, container) {
        this._renderer = renderer;
        this._container = container;
    }

    renderItems(itemsList) {
        itemsList.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(elem) {
        this._container.append(elem);
    }
    addNewItem(elem) {
        this._container.prepend(elem);
    }
}