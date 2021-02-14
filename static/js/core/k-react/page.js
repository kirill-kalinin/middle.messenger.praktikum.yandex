import DOMService from '../../core/k-react/dom-service.js';
export default class Page {
    constructor(blocks) {
        this._DOMService = new DOMService();
        this.blocks = blocks;
    }
    init() {
        for (let block of Object.values(this.blocks)) {
            this._DOMService.attachComponent.apply(null, block);
        }
    }
}
//# sourceMappingURL=page.js.map