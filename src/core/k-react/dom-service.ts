import Block from '../k-react/block.js';
import type { BlockChild } from '../../core/types.js';

export default class DOMService {
  attachComponent(child: BlockChild, cssSelector: string, parent?: Block) {
    let target;
    if (parent) {
      parent.setChild(child, cssSelector);
      target = parent.element;
    } else {
      target = document;
    }

    let content: DocumentFragment | HTMLElement;
    if (Array.isArray(child)) {
      content = document.createDocumentFragment();
      child.forEach(block => content.append(block.element));
    } else {
      content = child.element;
    }

    const root = target.querySelector(cssSelector);
    if (root) {
      root.appendChild(content);
    } else {
      throw new Error(`Не удалость добавить элемент в блок ${cssSelector}`);
    }
  }

  detachComponent(child: BlockChild, parent?: Block) {
    if (parent) {
      parent.unsetChild(child);
    }
    if (child instanceof Block) {
      child.element.remove();
    } else if (child.length) {
      const parentElement = child[0].element.parentElement;
      if (parentElement) {
        parentElement.innerHTML = '';
      }
    }
  }
}
