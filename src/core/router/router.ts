import Route from "./route";
import type { PageCreator } from "../types";

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

  constructor(rootQuery: string = '.root') {
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

  public use(pathname: string, viewCreator: PageCreator) {
    const route = new Route(pathname, viewCreator, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    this._clicksMiddleware();
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  public enable() {
    this._isDisabled = false;
  }

  public disable() {
    this._isDisabled = true;
  }

  get isDisabled() {
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

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private _getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
