/* eslint-disable @typescript-eslint/no-empty-function */
import EventBus from '../../modules/event-bus/event-bus';
import isEqual from '../../utils/mydash/is-equal/is-equal';
import type { BlockChild, BlockMeta, BlockProps } from '../../core/types';

// Подключение через CDN пока нет Webpack, с Parcel сборка получается с багом
// https://github.com/handlebars-lang/handlebars.js/issues/1593
// https://github.com/parcel-bundler/parcel/issues/1747

const handlebars = typeof window === 'object'
// eslint-disable-next-line @typescript-eslint/no-explicit-any 
    ? (window as any).Handlebars
    : require('handlebars');
if (handlebars === undefined) {
    throw new Error('Шаблонизатор не был загружен');
}

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    private _element: HTMLElement;
    private _meta: BlockMeta;
    private _children: Map<BlockChild, string>;

    public props: BlockProps;
    public eventBus: () => EventBus;

    constructor(tagName = 'div', className = '', props: BlockProps = {}) {
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

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const { tagName, className } = this._meta;
        this._element = this._createDocumentElement(tagName, className);
    }

    private _init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }

    public componentDidMount(): void {}

    private _componentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidUpdate();
    }

    public componentDidUpdate(): void {}

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }
        const newProps = Object.assign({}, this.props, nextProps);

        if (!isEqual(this.props, newProps)) {
            Object.assign(this.props, nextProps);
        }
    };

    public setChild = (child: BlockChild, cssSelector: string): void => {
        this._children.set(child, cssSelector);
    };

    public unsetChild = (child: BlockChild): void => {
        this._children.delete(child);
    };

    private _updateChildren = () => {
        for (const [child, cssSelector] of this._children) {
            let content: DocumentFragment | HTMLElement;
            if (Array.isArray(child)) {
                content = document.createDocumentFragment();
                child.forEach(block => content.append(block.element));
            } else {
                content = child.element;
            }
            const slot = this._element.querySelector(cssSelector);
            if (slot) {
                slot.appendChild(content);
            } else {
                console.error(`Не удалось восстановить дочерний элемент в блоке ${cssSelector}`);
            }
        }
    };

    private _addEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    get element(): HTMLElement {
        return this._element;
    }

    private _render() {
        const block = this.render();
        this._removeEvents();
        this._element.innerHTML = handlebars.compile(block)(this.props);
        this._updateChildren();
        this._addEvents();
    }

    public render(): string {
        return '<div>Default Template</div>';
    }

    private _makePropsProxy(props: BlockProps) {
        const proxyProps = new Proxy(props, {
            set: (target, prop, value) => {
                if (typeof prop === 'symbol') {
                    throw new Error('Нельзя использовать символы');
                }
                target[prop] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty: function() {
                throw new Error('Нет доступа');
            }
        });
        return proxyProps;
    }

    private _createDocumentElement(tagName: string, className: string) {
        const element = document.createElement(tagName);
        element.className = className;
        return element;
    }

    public show(): void {
        this._element.style.display = 'block';
    }

    public hide(): void {
        this._element.style.display = 'none';
    }
}
