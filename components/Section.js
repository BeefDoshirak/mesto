export default class Section {
    constructor({items, renderer}, container) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = container;
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(elem) {
        this._container.prepend(elem);
    }
}