import Block from '../core/k-react/block.js';
import Page from '../core/k-react/page.js';

type ChildSimple = [Block, string, Block];
type ChileComposite = [Block[], string, Block];

interface Page404 extends Page {
  blocks: {
    sidebar: ChildSimple,
    button: ChildSimple
  }
}

interface Page500 extends Page {
  blocks: {
    sidebar: ChildSimple,
    button: ChildSimple
  }
}

interface PageLogin extends Page {
  blocks: {
    sidebar: ChildSimple,
    loginForm: ChildSimple,
    buttonSubmit: ChildSimple
  }
}