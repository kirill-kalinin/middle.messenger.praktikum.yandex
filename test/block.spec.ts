import Block from '../src/core/k-react/block';
import { assert } from 'chai';
import { JSDOM } from 'jsdom';

const handlebars = require('handlebars');

describe('Block test', function () {

    let componentLink: Block;
    let componentDiv: Block;

    before('Create DOM', function () {
        const dom = new JSDOM(
            `<html>
                <body>
                    <div class="root"></div>
                </body>
            </html>`,
            { url: 'http://localhost' },
        );
        dom.window.handlebars = handlebars;
        (global as any).window = dom.window;
        (global as any).document = dom.window.document;

        componentLink = new Block('a', 'link-element', { text: 'first test' });
        componentDiv = new Block(undefined, undefined, { events: {
            click: (e) => {
                dom.window.block = e.target;
            }
        }});
    });

    describe('Create a link element', function () {

        it('Created component is link', function () {
            assert.isTrue(componentLink?.element instanceof window.HTMLAnchorElement);
        });

        it('Created component has class', function () {
            assert.isTrue(componentLink?.element.classList.contains('link-element'));
        });

        it('Created component has props', function () {
            assert.equal(componentLink?.props.text, 'first test');
        });

        it('Created component props may be changed', function () {
            componentLink?.setProps({ text: 'second test'});
            assert.equal(componentLink?.props.text, 'second test');
        });

    });

    describe('Create a default element', function () {

        it('Created component is div by default', function () {
            assert.isTrue(componentDiv?.element instanceof window.HTMLDivElement);
        });

        it('Created component has no class by default', function () {
            assert.equal(componentDiv?.element.classList.length, 0);
        });

        it('Created component has click event on itself', function () {
            componentDiv?.element.click();
            assert.equal((window as any).block, componentDiv.element);
        });

    });
});
