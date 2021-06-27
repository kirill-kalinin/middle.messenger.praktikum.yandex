import DOMService from '../../core/k-react/dom-service';
import Block from './block';
import type { PageProps, PageChildren } from '../types';

export default class Page {
    public root: Block;
    public children: PageChildren | undefined;
    private _DOMService: DOMService;

    constructor(props: PageProps) {
        this._DOMService = new DOMService();
        this.root = props.root;
        this.children = props.children;
        this._attachBlocks();
    }

    private _attachBlocks() {
        if (!this.children) {
            return;
        }
        for (const child of Object.values(this.children)) {
            this._DOMService.attachComponent.apply(null, child);
        }
    }

    public show(rootQuery: string): void {
        this._DOMService.attachComponent(this.root, rootQuery);
    }

    public hide(): void {
        this._DOMService.detachComponent(this.root);
    }
}
