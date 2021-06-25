import Template from '../../../static/components/profile/profile.hbs.js';
import Block from '../../core/k-react/block';
import FormHandler from '../../core/form-handler';
import AvatarUploadHandler from '../../core/avatar-upload-handler';
import type { BlockProps } from '../../core/types';

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
