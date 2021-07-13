import Route from './route';
import mainStore from '../store/app-stores/main/store-main';
import type { PageCreator } from '../types';

export enum RouterDirections {
    BACK = 'BACK',
    FORWARD = 'FORWARD'
}

export default class Router {
    private static __instance: Router | undefined;
    public routes: Route[];
    public history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;
    private _isDisabled: boolean;
    private _isUserLoggedIn: unknown;
    private _isChatSelected: boolean;

    constructor(rootQuery = '.root') {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._isDisabled = false;
        this._isUserLoggedIn = mainStore.state.isLoggedIn;
        this._isChatSelected = mainStore.state.activeContactId !== null;

        mainStore.subscribe('isLoggedIn', newState => {
            this._isUserLoggedIn = newState.isLoggedIn;
            this._currentRoute && this._isValidRoute(this._currentRoute);
        });
        mainStore.subscribe('activeContactId', newState => {
            this._isChatSelected = newState.activeContactId !== null;
            this._currentRoute && this._isValidRoute(this._currentRoute);
        });

        Router.__instance = this;
    }

    public use(pathname: string, pageCreator: PageCreator, isPrivate = false): Router {
        const route = new Route(pathname, pageCreator, { isPrivate, rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    public start(): void {
        this._clicksMiddleware();
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public enable(): void {
        this._isDisabled = false;
    }

    public disable(): void {
        this._isDisabled = true;
    }

    get isDisabled(): boolean {
        return this._isDisabled;
    }

    private _clicksMiddleware() {
        document.addEventListener('click', (e: Event) => {
            if (e.target instanceof HTMLElement) {
                const route = e.target.closest('[data-route]');
                if (route instanceof HTMLElement && typeof route.dataset.route === 'string') {
                    e.preventDefault();
                    if (this._isDisabled) {
                        return;
                    }
                    const link = route.dataset.route;
                    switch (link) {
                    case RouterDirections.BACK:
                        this.back();
                        break;
                    case RouterDirections.FORWARD:
                        this.forward();
                        break;
                    case '':
                        break;
                    default:
                        this.go(link);
                        break;
                    }
                }
            }
        });
    }

    private _isValidRoute(route: Route | undefined): route is Route {
        if (!route) {
            this._onRoute('/404');
            return false;
        }
        if (this._isUserLoggedIn === false && route.isPrivate) {
            this.go('/login');
            return false;
        }
        if (this._isUserLoggedIn === true && (route.path === '/login' || route.path === '/signup')) {
            this.go('/chat-select');
            return false;
        }
        if (this._isChatSelected === false && route.path === '/chat-active') {
            this.go('/chat-select');
            return false;
        }
        if (this._isChatSelected === true && route.path === '/chat-select') {
            this.go('/chat-active');
            return false;
        }
        return true;
    }

    private _onRoute(pathname: string) {
        const route = this._getRoute(pathname);
        if (!this._isValidRoute(route)) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

    private _getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
