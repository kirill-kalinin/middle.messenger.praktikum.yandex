export default `
    <form class="form {{name}}__form" name="{{name}}">
        <p class="form__title">{{title}}</p>
        {{#each fields}}
        <label class="form__label">{{label}}
            <input class="form__input" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}"
                data-validation-key="{{validationKey}}" {{#if equality}}data-required-equality="true"{{/if}}>
            <p class="invalid-input-alert">{{validationText}}</p>
        </label>
        {{/each}}
        <div class="form__submit"></div>
    </form>
`;
