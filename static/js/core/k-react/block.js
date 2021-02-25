import EventBus from './event-bus.js';
const Handlebars = window.Handlebars;
export default class Block {
    constructor(tagName = 'div', className = '', props = {}) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this.setChild = (child, cssSelector) => {
            this._children.set(child, cssSelector);
        };
        this.unsetChild = (child) => {
            this._children.delete(child);
        };
        this._updateChildren = () => {
            for (let [child, cssSelector] of this._children) {
                let content;
                if (Array.isArray(child)) {
                    content = document.createDocumentFragment();
                    child.forEach(block => content.append(block.element));
                }
                else {
                    content = child.element;
                }
                const slot = this._element.querySelector(cssSelector);
                if (slot) {
                    slot.appendChild(content);
                }
                else {
                    console.error(`Не удалось восстановить дочерний элемент в блоке ${cssSelector}`);
                }
            }
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            className,
            props
        };
        this._children = new Map();
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        const { tagName, className } = this._meta;
        this._element = this._createDocumentElement(tagName, className);
    }
    _init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }
    componentDidMount() { }
    _componentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidUpdate();
    }
    componentDidUpdate() { }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        this._element.innerHTML = Handlebars.compile(block)(this.props);
        this._updateChildren();
    }
    render() { }
    _makePropsProxy(props) {
        const proxyProps = new Proxy(props, {
            set: (target, prop, value) => {
                if (typeof prop === 'symbol') {
                    throw new Error('Нельзя использовать символы');
                }
                target[prop] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty: function () {
                throw new Error('Нет доступа');
            }
        });
        return proxyProps;
    }
    _createDocumentElement(tagName, className) {
        const element = document.createElement(tagName);
        element.className = className;
        return element;
    }
    show() {
        this._element.style.display = 'block';
    }
    hide() {
        this._element.style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
};
//# sourceMappingURL=block.js.map