import DOMService from '../../core/k-react/dom-service.js';
import Router from '../router/router.js';
export default class Page {
    constructor(props) {
        this._DOMService = new DOMService();
        this.router = new Router();
        this.root = props.root;
        this.blocks = props.children;
        this._attachBlocks();
        props.controller(this);
    }
    _attachBlocks() {
        if (!this.blocks) {
            return;
        }
        for (let block of Object.values(this.blocks)) {
            this._DOMService.attachComponent.apply(null, block);
        }
    }
    show(rootQuery) {
        this._DOMService.attachComponent(this.root, rootQuery);
    }
    hide() {
        this._DOMService.detachComponent(this.root);
    }
}
//# sourceMappingURL=page.js.map