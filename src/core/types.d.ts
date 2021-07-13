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
    id: number | null,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string | null
}

interface ChatProps extends BlockProps {
    chatModeActive?: boolean,
    chatModeSelect?: boolean,
    messages: MessageProps[]
}

interface ChatSidebarProps extends BlockProps {
    contacts: ContactProps[],
    activeContactId: ContactProps['id'] | null,
}

interface ContactProps extends BlockProps {
    id: number,
    title: string,
    avatar: string,
    unreadCount: number,
    lastMessage: string,
    date: string[],
    active: boolean
}

interface ContactResponse {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message?: {
        user: {
            [data: string]: string
        },
        time: string,
        content: string
    }
}

interface ChatUserResponse {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
    role: string
}

interface MessageProps extends BlockProps {
    isOwn: boolean,
    isImage: boolean,
    isReaded: boolean,
    imgSrc: string,
    text: string,
    date: string
}

interface SidebarMenu extends BlockProps {
    menuItems: {
        text: string,
        link: string,
        active?: boolean,
        event?: string
    }[]
}

type PopupEvents = {
    primary?: Function,
    secondary?: Function
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

type RoutePathname = string

type AppRoutes = [
    RoutePathname,
    PageCreator,
    RouterProps['isPrivate']?
][]

interface RouterProps {
    isPrivate: boolean;
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
    credentials?: boolean,
    timeout?: number
}

interface RequestOptionsMethodGet {
    data?: { [param: string]: unknown },
    credentials?: boolean,
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

type StoreParams = {
    actions: Actions,
    mutations: Mutations,
    state: State
}

type StoreStatus = 'resting' | 'action' | 'mutation'

type Action = (context: Store, payload: unknown) => void
type Actions = { [action: string]: Action }

type Mutation = (state: State, payload: unknown) => State
type Mutations = { [mutation: string]: Mutation }

type Selector = (state: State) => BlockProps
type Selectors = { [selector: string]: Selector }

type StateUpdateCallback = (state: State) => void

interface MainStoreParams extends StoreParams {
    state: MainStoreState
}

interface MainStoreState extends State {
    isLoggedIn: boolean | null,
    userInfo: UserInfo,
    contacts: ContactProps[],
    activeContactId: number | null,
    filter: string
}

interface MessagesStoreParams extends StoreParams {
    state: MessagesStoreState
}

interface MessagesStoreState extends State {
    [contactId: number]: MessageProps[]
}
