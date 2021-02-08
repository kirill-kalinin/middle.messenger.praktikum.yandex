import Template from '../../../components/chat/chat.hbs.js';
import Block from '../../core/k-react/block.js';

export default class Chat extends Block {
  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
    this._hiddenBlockHandler();
  }

  private _hiddenBlockHandler() {
    const attachToMessageButton = this.element.querySelector('.chat__form-button_attach');
    const attachToMessageInputs = this.element.querySelector('.chat__attach');
    if (!attachToMessageButton || !attachToMessageInputs) {
      return;
    }
    attachToMessageButton.addEventListener('click', function() {
      attachToMessageInputs.classList.toggle('chat__attach_visible');
    });
  }

  render() {
    return Template;
  }
}
