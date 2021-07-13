import ImageUrlClose from 'url:../../../static/images/popup-close.svg';

export default `
    <div class="popup">
        <div class="popup__container">
            <p class="popup__title">{{title}}</p>
            <div class="popup__content">
                {{#if typeIsInput}}
                <label class="popup__label">{{label}}
                    <input class="popup__input" type="text" placeholder="{{placeholder}}" 
                        data-validator="{{validator}}"/>
                </label>
                {{/if}}

                {{#if typeIsSelect}}
                <p class="popup__alert">{{description}}</p>
                {{/if}}

                {{#if typeIsList}}
                <ul class="popup__list">
                    {{#each list}}
                    <li>{{this}}</li>
                    {{/each}}
                </ul>
                {{/if}}

                {{#if typeIsConfirm}}
                <p class="popup__alert">{{description}}</p>
                <p class="popup__confirm-value">{{value}}</p>
                {{/if}}

                {{#if typeIsWarning}}
                <p class="popup__alert">{{warningMessage}}</p>
                {{/if}}
            </div>
            <div class="popup__buttons">
                <div class="popup__button"></div>
                {{#if typeIsSelect}}
                <div class="popup__button-secondary"></div>
                {{/if}}
            </div>
            {{#if isCloseable}}
            <img class="popup__close" src="${ImageUrlClose}" alt="X">
            {{/if}}
        </div>
    </div>
`;
