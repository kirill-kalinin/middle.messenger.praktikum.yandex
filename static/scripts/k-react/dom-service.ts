import Block from '../k-react/block.js';

export default class DOMService {
  attachComponent(parent: HTMLDocument | Block, cssSelector: string, child: BlockChild) {
    let target;
    if (parent instanceof Block) {
      parent.setChild(child, cssSelector);
      target = parent.element;
    } else {
      target = parent;
    }

    let content;
    if (Array.isArray(child)) {
      content = document.createDocumentFragment();
      content.append(...child);
    } else {
      content = child;
    }

    const root = target.querySelector(cssSelector);
    if (root) {
      root.appendChild(content);
    } else {
      throw new Error(`Не удалость добавить элемент в блок ${cssSelector}`);
    }
  }

  detachComponent(parent: HTMLDocument | Block, child: BlockChild) {
    if (parent instanceof Block) {
      parent.unsetChild(child);
    }
    if (child instanceof HTMLElement) {
      child.remove();
    } else if (child.length) {
      const parent = child[0].parentElement;
      if (parent) {
        parent.innerHTML = '';
      }
    }
  }
}
