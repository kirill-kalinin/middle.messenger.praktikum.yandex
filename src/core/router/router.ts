import Route from './route';
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

    constructor(rootQuery = '.root') {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._isDisabled = false;

        Router.__instance = this;
    }

    public use(pathname: string, pageCreator: PageCreator): Router {
        const route = new Route(pathname, pageCreator, { rootQuery: this._rootQuery });
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
                    default:
                        this.go(link);
                        break;
                    }
                }
            }
        });
    }

    private _onRoute(pathname: string) {
        const route = this._getRoute(pathname);
        if (!route) {
            this._onRoute('/404');
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
