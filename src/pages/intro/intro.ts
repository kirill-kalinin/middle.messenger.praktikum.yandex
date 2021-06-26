import Page from '../../core/k-react/page';
import Intro from '../../components/intro/intro';

export default function createPageIntro(): Page {
    const intro = new Intro({ animate: false });

    return new Page({
        root: intro
    });
}
