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
    [propName: string]: unknown,
    events?: BlockEvents
}

interface BlockEvents {
    [event: string]: (e: Event) => unknown;
}

interface UserInfo extends BlockProps {
    id: string | null,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string | null
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

interface Message extends BlockProps {
    isOwn: boolean,
    isImage: boolean,
    isReaded: boolean,
    imgSrc: string,
    text: string,
    date: string
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

type Controllers = {
    [method: string]: Function
}

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
 *  Form models
 */

interface LoginFormModel {
    email: string;
    password: string;
}

interface SignupFormModel {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

/**
 *  Store types
 */
type State = {
    [data: string]: unknown
}

type StoreParams = {
    actions: Actions,
    mutations: Mutations,
    state: State
}

type StoreStatus = 'resting' | 'action' | 'mutation'

type Action = (context: Store, payload: State) => void
type Actions = { [action: string]: Action }

type Mutation = (state: State, payload: State) => State
type Mutations = { [mutation: string]: Mutation }

type Selector = (state: State) => BlockProps
type Selectors = { [selector: string]: Selector }

interface MainStoreParams extends StoreParams {
    state: MainStoreState
}

interface MainStoreState extends State {
    userInfo: UserInfo,
    contacts: Contact[],
    activeContactId: string | null
}

interface MessagesStoreParams extends StoreParams {
    state: MessagesStoreState
}

interface MessagesStoreState extends State {
    [contactId: string]: Message[]
}
