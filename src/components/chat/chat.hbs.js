import ImageUrlButtonAttach from '../../../static/images/button-attach.svg';
import ImageUrlButtonSend from '../../../static/images/button-send.svg';

export default `
    <div class="wrapper wrapper_wide">
        <div class="chat container container_unbordered">
            <aside class="chat__sidebar bordered-block"></aside>
            <main class="chat__main-block{{#if chatModeSelect}} bordered-block{{/if}}">
                {{#if chatModeSelect}}
                <div class="chat__warning">Выберите собеседника из списка<br>или добавьте новый контакт</div>
                {{/if}}

                {{#if chatModeActive}}
                <div class="chat__messages bordered-block">
                    <ul class="chat__messages-list"></ul>
                </div>
                <form class="chat__form" name="message">
                    <ul class="chat__attach bordered-block">
                        <li class="chat__attach-option">
                            <label class="chat__attach-label">Изображение
                                <input class="chat__attach-input" type="file" name="photo" accept="image/jpeg">
                            </label>
                        </li>
                        <li class="chat__attach-option">
                            <label class="chat__attach-label">Файл
                                <input class="chat__attach-input" type="file" name="file" accept=".doc,.zip" disabled="true">
                            </label>
                        </li>
                        <li class="chat__attach-option">
                            <label class="chat__attach-label">Локация
                                <input class="chat__attach-input" type="file" name="location" accept=".txt" disabled="true">
                            </label>
                        </li>
                    </ul>
                    <div class="chat__new-message bordered-block" name="message">
                        <textarea class="chat__textarea" cols="1" maxlength="400" 
                        name="message" placeholder="Сообщение..."></textarea>
                        <button class="chat__form-button chat__form-button_attach" type="button">
                            <img class="chat__button-image" src="${ImageUrlButtonAttach}" alt=" ">
                        </button>
                        <button class="chat__form-button chat__form-button_submit" type="submit">
                            <img class="chat__button-image" src="${ImageUrlButtonSend}" alt=" ">
                        </button>
                    </div>
                </form>
                {{/if}}
            </main>
        </div>
    </div>
`;
