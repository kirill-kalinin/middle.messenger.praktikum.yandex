import EventBus from './event-bus.js';

const Handlebars = window.Handlebars;

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  _element = null;
  _meta = null;
  _children = new Map();

  /** JSDoc
   * @param {string} tagName
   * @param {string} className
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', className = '', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      className,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName, className } = this._meta;
    this._element = this._createDocumentElement(tagName, className);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setChild = (child, cssSelector) => {
    this._children.set(child, cssSelector);
  };

  unsetChild = (child) => {
    this._children.delete(child);
  };

  _updateChildren = () => {
    for (let [child, cssSelector] of this._children) {
      let content;
      if (Array.isArray(child)) {
        content = document.createDocumentFragment();
        content.append(...child);
      } else {
        content = child;
      }
      this._element.querySelector(cssSelector).appendChild(content);
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._element.innerHTML = Handlebars.compile(block)(this.props);
    this._updateChildren();
  }

  render() {}

  _makePropsProxy(props) {
    const self = this;
    const proxyProps = new Proxy(props, {
      set: function(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty: function() {
        throw new Error('нет доступа');
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
