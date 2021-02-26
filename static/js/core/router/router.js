import Route from "./route.js";
export var RouterDirections;
(function (RouterDirections) {
    RouterDirections["BACK"] = "BACK";
    RouterDirections["FORWARD"] = "FORWARD";
})(RouterDirections || (RouterDirections = {}));
export default class Router {
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
    use(pathname, viewCreator) {
        const route = new Route(pathname, viewCreator, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        this._clicksMiddleware();
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    enable() {
        this._isDisabled = false;
    }
    disable() {
        this._isDisabled = true;
    }
    get isDisabled() {
        return this._isDisabled;
    }
    _clicksMiddleware() {
        document.addEventListener('click', (e) => {
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
                        default:
                            this.go(link);
                            break;
                    }
                }
            }
        });
    }
    _onRoute(pathname) {
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
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    _getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=router.js.map