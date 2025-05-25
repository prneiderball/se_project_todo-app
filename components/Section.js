class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(`Container element with selector "${containerSelector}" not found in the DOM`);
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  setItems(items) {
    this._items = items;
  }
}

export default Section;