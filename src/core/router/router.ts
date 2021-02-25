import Route from "./route.js";
import type { PageCreator } from "../types.js";

export default class Router {
  private static __instance: Router | undefined;
  public routes: Route[];
  public history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string = '.root') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, viewCreator: PageCreator) {
    const route = new Route(pathname, viewCreator, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    this._linksMiddleware();
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _linksMiddleware() {
    document.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.dataset.route) {
        e.preventDefault();
        const route = e.target.dataset.route;
        if (route === 'BACK') {
          this.back();
        } else {
          this.go(route);
        }
      }
    });
  }

  _onRoute(pathname: string) {
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

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
