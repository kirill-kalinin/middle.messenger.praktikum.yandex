import Block from './k-react/block';
import Page from './k-react/page';
import { METHODS } from './services/http-service';

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

interface PageChildren {
  [childName: string]: [BlockChild, string, Block?]
}

interface PageProps {
  root: Block,
  children?: PageChildren,
  controller: Function
}

interface Validators {
  [propName: string]: RegExp
}

interface RouterProps {
  rootQuery: string;
}

type PageCreator = () => Page;

type RequestData = string | Document | Blob 
  | ArrayBufferView | ArrayBuffer | FormData 
  | URLSearchParams | ReadableStream<Uint8Array> 
  | null | undefined;

interface RequestOptions {
  data?: RequestData,
  timeout?: number
}

interface RequestOptionsMethodGet {
  data?: {[param: string]: unknown},
  timeout?: number
}

interface RequestOptionsWithMethod extends RequestOptions {
  method: METHODS
}

