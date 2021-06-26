import DOMService from '../../core/k-react/dom-service';
import Block from './block';
import type { PageProps, PageChildren } from '../types';

export default class Page {
  public root: Block;
  public blocks: PageChildren | undefined;
  private _DOMService: DOMService;

  constructor(props: PageProps) {
      this._DOMService = new DOMService();
      this.root = props.root;
      this.blocks = props.children;
      this._attachBlocks();
  }

  private _attachBlocks() {
      if (!this.blocks) {
          return;
      }
      for (const block of Object.values(this.blocks)) {
          this._DOMService.attachComponent.apply(null, block);
      }
  }

  public show(rootQuery: string): void {
      this._DOMService.attachComponent(this.root, rootQuery);
  }

  public hide(): void {
      this._DOMService.detachComponent(this.root);
  }
}
