import Route from "./route.js";
export default class Router {
    constructor(rootQuery = '.root') {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, viewCreator) {
        const route = new Route(pathname, viewCreator, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        this._linksMiddleware();
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _linksMiddleware() {
        document.addEventListener('click', (e) => {
            if (e.target instanceof HTMLElement && e.target.dataset.route) {
                e.preventDefault();
                const route = e.target.dataset.route;
                if (route === 'BACK') {
                    this.back();
                }
                else {
                    this.go(route);
                }
            }
        });
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
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
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=router.js.map