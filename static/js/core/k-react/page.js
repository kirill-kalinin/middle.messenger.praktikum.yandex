import DOMService from '../../core/k-react/dom-service.js';
export default class Page {
    constructor(props) {
        this._DOMService = new DOMService();
        this.root = props.root;
        this.blocks = props.children;
        this.controller = props.controller;
    }
    attachBlocks() {
        if (!this.blocks) {
            return;
        }
        for (let block of Object.values(this.blocks)) {
            this._DOMService.attachComponent.apply(null, block);
        }
    }
    show() {
        if (!this._rootQuery) {
            throw new Error('Страница не была корректно инициализирована');
        }
        this._DOMService.attachComponent(this.root, this._rootQuery);
    }
    hide() {
        this._DOMService.detachComponent(this.root);
    }
    render(rootQuery) {
        this._DOMService.attachComponent(this.root, rootQuery);
        this.attachBlocks();
        this.controller(this);
    }
}
//# sourceMappingURL=page.js.map