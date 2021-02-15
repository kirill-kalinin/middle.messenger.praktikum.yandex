import DOMService from '../../core/k-react/dom-service.js';
import Router from './router.js';
import Block from './block.js';
import type { PageProps, PageChildren } from '../types.js';

export default class Page {
  public root: Block;
  public blocks: PageChildren | undefined;
  public router: Router;
  private _DOMService: DOMService;

  constructor(props: PageProps) {
    this._DOMService = new DOMService();
    this.router = new Router();
    this.root = props.root;
    this.blocks = props.children;
    this._attachBlocks();
    
    props.controller(this);
  }

  private _attachBlocks() {
    if (!this.blocks) {
      return;
    }
    for (let block of Object.values(this.blocks)) {
      this._DOMService.attachComponent.apply(null, block);
    }
  }

  public show(rootQuery: string) {
    this._DOMService.attachComponent(this.root, rootQuery);
  }

  public hide() {
    this._DOMService.detachComponent(this.root);
  }
}
