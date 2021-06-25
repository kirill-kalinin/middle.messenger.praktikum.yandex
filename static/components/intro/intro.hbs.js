import ImageUrlLogo from 'url:../../images/logo.svg';

export default `
  <div class="wrapper">
    <main class="intro container">
      <img class="intro__logo" src="${ImageUrlLogo}" alt=" ">
      <h1 class="intro__text{{#if animate}} intro__text_animated{{/if}}">K-Chat</h1>
    </main>
  </div>
`
