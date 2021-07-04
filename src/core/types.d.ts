import Block from './k-react/block';
import Page from './k-react/page';
import Store from './store/store';
import { METHODS } from '../modules/http-services/http-service';

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
    children?: PageChildren
}

interface Validators {
    [propName: string]: RegExp
}

interface RouterProps {
    rootQuery: string;
}

type PageCreator = () => Page;

/**
 *  HTTP request types
 */
type RequestData = string | Document | Blob
    | ArrayBufferView | ArrayBuffer | FormData
    | URLSearchParams | ReadableStream<Uint8Array>
    | null | undefined;

interface RequestOptions {
    data?: RequestData,
    headers?: [string, string][],
    timeout?: number
}

interface RequestOptionsMethodGet {
    data?: { [param: string]: unknown },
    timeout?: number
}

interface RequestOptionsWithMethod extends RequestOptions {
    method: METHODS
}

/**
 *  Store types
 */
type State = {
    [data: string]: unknown
}

type storeParams = {
    actions: Actions,
    mutations: Mutations,
    state?: State
}

type StoreStatus = 'resting' | 'action' | 'mutation'

type Action = (context: Store, payload: State) => void
type Actions = { [action: string]: Action }

type Mutation = (state: State, payload: State) => State
type Mutations = { [mutation: string]: Mutation }

type stateUpdateCallback = (state: State) => unknown
