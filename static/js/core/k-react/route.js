export default class Route {
    constructor(pathname, viewCreator, props) {
        this._pathname = pathname;
        this._pageCreator = viewCreator;
        this._page = null;
        this._props = props;
    }
    navigate(pathname) {
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
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        if (!this._page) {
            this._page = this._pageCreator();
            this._page.render(this._props.rootQuery);
            return;
        }
        this._page.show();
    }
}
//# sourceMappingURL=route.js.map