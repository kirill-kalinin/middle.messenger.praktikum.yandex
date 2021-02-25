import Template from '../../../components/profile/profile.hbs.js';
import Block from '../../core/k-react/block.js';
import FormHandler from '../../core/form-handler.js';
import AvatarUploadHandler from '../../core/avatar-upload-handler.js';
import type { BlockProps } from '../../core/types.js';

export default class Profile extends Block {

  private _formHandler: FormHandler;
  private _avatarUploadHandler: AvatarUploadHandler;

  constructor(props: BlockProps = {}, className = 'fragment') {
    super('div', className, props);
  }

  private _setInputListeners() {
    const form = this.element.querySelector('form');
    if (form instanceof HTMLFormElement) {
      this._formHandler.addValidationListeners(form);
    }
  }

  componentDidMount() {
    this._formHandler = new FormHandler();
    this._avatarUploadHandler = new AvatarUploadHandler();
    this._setInputListeners();
    this._avatarUploadHandler.handle(this.element);
  }

  componentDidUpdate() {
    this._setInputListeners();
    this._avatarUploadHandler.handle(this.element);
  }

  render() {
    return Template;
  }

}
