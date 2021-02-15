import Page from "./page.js";
import type { RouterProps, PageCreator } from "../types.js";

export default class Route {
  private _pathname: string;
  private _pageCreator: PageCreator;
  private _page: Page | null;
  private _props: RouterProps;

  constructor(pathname: string, viewCreator: PageCreator, props: RouterProps) {
    this._pathname = pathname;
    this._pageCreator = viewCreator;
    this._page = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._page) {
      this._page.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._page) {
      this._page = this._pageCreator();
    }

    this._page.show(this._props.rootQuery);
  }
}
