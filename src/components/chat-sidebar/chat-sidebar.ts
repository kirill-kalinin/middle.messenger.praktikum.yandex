import Template from './chat-sidebar.hbs.js';
import Block from '../../core/k-react/block';
import ToolbarButtonsHandler from './modules/toolbar-buttons-handler';
import type { BlockProps } from '../../core/types';

export default class ChatSidebar extends Block {

    private _toolbarButtonsHandler: ToolbarButtonsHandler;

    constructor(props: BlockProps = {}, className = 'fragment') {
        super('div', className, props);
    }

    componentDidMount(): void {
        this._toolbarButtonsHandler = new ToolbarButtonsHandler();
        this._toolbarButtonsHandler.init(this.element);
    }

    componentDidUpdate(): void {
        this._toolbarButtonsHandler.update(this.element);
    }

    render(): string {
        return Template;
    }

}
