import Router from './router';
import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import Page from '../k-react/page';
import Block from '../k-react/block';
// const sinon = require('sinon');

describe('Router test', function () {

    const router = new Router();
    let pageStub: Page;

    before('Create DOM', function () {
        const dom = new JSDOM(
            `<html>
                <body>
                    <div class="root"></div>
                </body>
            </html>`,
            { url: 'http://localhost' },
        );
        (global as any).window = dom.window;
        (global as any).document = dom.window.document;
    });

    describe('Base tests', function () {

        before(function() {
            pageStub = new Page({ root: new Block() });
        });

        it('Router is singleton', function () {
            const secondRouter = new Router();
            assert.strictEqual(secondRouter, router);
        });

        it('Router initialized, routes added', function () {
            router.use('/login', () => pageStub);
            router.use('/signup', () => pageStub);
            router.use('/chat-select', () => pageStub, true);
            assert.equal(router.routes.length, 3);
        });

        it('Route login is public', function () {
            const routeLogin = router.routes.find(route => route.path === '/login');
            assert.equal(routeLogin?.isPrivate, false);
        });

        it('Route chat-select is private', function () {
            const routeLogin = router.routes.find(route => route.path === '/chat-select');
            assert.equal(routeLogin?.isPrivate, true);
        });

    });

    describe('Navigation tests', function () {

        before(function() {
            //pageStub = new Page({ root: new Block() });
        });

        it('1', function () {
            router.go('/signup');
            assert.equal(router.history.state.url, '/signup');
        });

    });

});
