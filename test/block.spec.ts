/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '../src/core/k-react/block';
import { assert } from 'chai';
import { JSDOM } from 'jsdom';
const sinon = require('sinon');

const handlebars = require('handlebars');

describe('Block test', function () {

    let componentLink: Block;
    let componentDiv: Block;
    let componentButton: Block;
    let fake: { callCount: any; };

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

        componentDiv = new Block();

        componentButton = new Block('button', '', { events: {
            click: (e) => {
                dom.window.button = e.target;
            }
        }});
        
        fake = sinon.replace(
            componentLink, 'componentDidUpdate', sinon.fake(componentLink.componentDidUpdate)
        );
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

        it('Changing props calls method componentDidUpdate', function () {
            componentLink?.setProps({ text: 'third test'});
            assert.equal(fake.callCount, 2);
        });

    });

    describe('Create a default element', function () {

        it('Created component is div by default', function () {
            assert.isTrue(componentDiv?.element instanceof window.HTMLDivElement);
        });

        it('Created component has no class by default', function () {
            assert.equal(componentDiv?.element.classList.length, 0);
        });

        it('Created component has no props by default', function () {
            const propsCount = componentDiv && Object.keys(componentDiv.props).length;
            assert.equal(propsCount, 0);
        });

    });

    describe('Create a button element', function () {

        it('Created component is button', function () {
            assert.isTrue(componentButton?.element instanceof window.HTMLButtonElement);
        });

        it('Created component has click event on itself', function () {
            componentButton?.element.click();
            assert.equal((window as any).button, componentButton.element);
        });

        it('Created component can hide', function () {
            componentButton.hide();
            assert.equal(componentButton?.element.style.display, 'none');
        });

        it('Created component can become visible again', function () {
            componentButton.show();
            assert.equal(componentButton?.element.style.display, 'block');
        });

    });
});
