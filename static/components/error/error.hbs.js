export default `
  <div class="wrapper">
    <div class="container bordered-block">
      <div class="error">
        <aside class="error__sidebar"></aside>
        <main class="error__main-block">
          <div class="error__title-wrapper">
            <p class="error__title">{{title}}</p>
            <p class="error__code">{{code}}</p>
          </div>
          <p class="error__description">{{description}}</p>
          <div class="error__button-slot"></div>
        </main>
      </div>
    </div>
  </div>
`;
