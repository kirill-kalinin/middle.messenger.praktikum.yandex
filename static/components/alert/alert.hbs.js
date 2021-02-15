export default `
  <div class="wrapper">
    <div class="container bordered-block">
      <div class="alert">
        <aside class="alert__sidebar"></aside>
        <main class="alert__main-block">
          <div class="alert__title-wrapper">
            <p class="alert__title">{{title}}</p>
            <p class="alert__code">{{code}}</p>
          </div>
          <p class="alert__description">{{description}}</p>
          <div class="alert__button-slot"></div>
        </main>
      </div>
    </div>
  </div>
`;
