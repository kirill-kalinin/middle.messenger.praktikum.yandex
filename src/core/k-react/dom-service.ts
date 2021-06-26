import Block from '../k-react/block';
import type { BlockChild } from '../../core/types';

export default class DOMService {
    attachComponent(child: BlockChild, cssSelector: string, parent?: Block): void {
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

    detachComponent(child: BlockChild, parent?: Block): void {
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
