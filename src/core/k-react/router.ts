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
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
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
