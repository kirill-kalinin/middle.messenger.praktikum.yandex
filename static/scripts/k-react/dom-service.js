import Block from '../k-react/block.js';

export default class DOMService {
  attachComponent(parent, cssSelector, child) {
    let target = parent;
    if (parent instanceof Block) {
      parent.setChild(child, cssSelector);
      target = parent.element;
    }
    const root = target.querySelector(cssSelector);
    root.appendChild(child.getContent());
  }

  detachComponent(parent, child) {
    if (parent instanceof Block) {
      parent.unsetChild(child);
    }
    child.element.remove();
  }
}
