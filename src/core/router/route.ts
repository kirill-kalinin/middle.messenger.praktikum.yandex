import Page from '../k-react/page';
import type { RouterProps, PageCreator } from '../types';

export default class Route {
    private _pathname: string;
    private _pageCreator: PageCreator;
    private _page: Page | null;
    private _props: RouterProps;

    constructor(pathname: string, pageCreator: PageCreator, props: RouterProps) {
        this._pathname = pathname;
        this._pageCreator = pageCreator;
        this._page = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._page) {
            this._page.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._page) {
            this._page = this._pageCreator();
        }

        this._page.show(this._props.rootQuery);
    }
}
