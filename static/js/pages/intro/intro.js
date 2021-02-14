import Page from '../../core/k-react/page.js';
import Intro from '../../components/intro/intro.js';
import Router from '../../core/k-react/router.js';
export default function createPageIntro() {
    const intro = new Intro({ animate: false });
    return new Page({
        root: intro,
        controller
    });
}
function controller(page) {
    const router = new Router();
    window.addEventListener('load', function () {
        page.root.setProps({ animate: true });
        setTimeout(function () {
            router.go('/login');
        }, 3000);
    });
}
//# sourceMappingURL=intro.js.map