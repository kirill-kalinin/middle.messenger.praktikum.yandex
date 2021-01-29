import Block from '../k-react/block.js';

export default class DOMService {
  attachComponent(parent, cssSelector, child) {
    let target = parent;
    if (parent instanceof Block) {
      parent.setChild(child, cssSelector);
      target = parent.element;
    }

    let content;
    if (Array.isArray(child)) {
      content = document.createDocumentFragment();
      content.append(...child);
    } else {
      content = child;
    }

    const root = target.querySelector(cssSelector);
    root.appendChild(content);
  }

  detachComponent(parent, child) {
    if (parent instanceof Block) {
      parent.unsetChild(child);
    }
    child.remove();
  }
}
