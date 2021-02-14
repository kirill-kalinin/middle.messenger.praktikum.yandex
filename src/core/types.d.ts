import Block from "./k-react/block";

interface EventBusListeners {
  [propName: string]: Array<Function>;
}

interface BlockMeta {
  tagName: string,
  className: string,
  props: object
}

interface BlockProps {
  [propName: string]: unknown;
}

interface Contact extends BlockProps {
  id: string,
  link: string,
  avatar: string,
  name: string,
  message: string,
  counter: number,
  date: string,
  readed: boolean,
  active?: boolean
}

interface SidebarMenu extends BlockProps {
  menuItems: {
    link: string,
    text: string,
    active?: boolean
  }[]
}

type BlockChild = Block | Array<Block>;

interface PageBlocks {
  root: [Block, string],
  [childName: string]: [BlockChild, string, Block?]
}

interface Validators {
  [propName: string]: RegExp
}
