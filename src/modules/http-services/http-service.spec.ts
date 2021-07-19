/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTPService from './http-service';
import { assert } from 'chai';
import { JSDOM } from 'jsdom';
const sinon = require('sinon');

describe('HTTP Test', () => {

    const httpService = new HTTPService();
    const requests: any[] = [];

    before('Create fake XHR', function () {
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

        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

        (global.XMLHttpRequest as any).onCreate = function(req: any) {
            requests.push(req);
        };
    });

    after('Restore XHR', function () {
        (global.XMLHttpRequest as any).restore();
    });

    describe('Test GET method', function () {

        before(function() {
            httpService.get('/chats', {
                data: { title: 'test', limit: 100, offset: 0 },
                credentials: true
            });
        });

        it('Request method is GET', function () {
            assert.equal(requests[0].method, 'GET');
        });

        it('Request has correct url and query string', function () {
            assert.equal(
                requests[0].url, 
                'https://ya-praktikum.tech/api/v2/chats?title=test&limit=100&offset=0'
            );
        });

        it('Request with credentials', function () {
            assert.equal(requests[0].withCredentials, true);
        });

        it('Request with default timeout', function () {
            assert.equal(requests[0].timeout, 5000);
        });

    });

    describe('Test POST method', function () {

        before(function() {
            const form = new window.FormData();
            form.append('login', 'UserName');
            form.append('password', 'Password123');
            httpService.post('/auth/signin', {
                data: JSON.stringify(Object.fromEntries(form.entries())),
                credentials: true,
                headers: [
                    ['Content-type', 'application/json; charset=utf-8']
                ]
            });
        });

        it('Request method is POST', function () {
            assert.equal(requests[1].method, 'POST');
        });

        it('Request has correct url', function () {
            assert.equal(requests[1].url, 'https://ya-praktikum.tech/api/v2/auth/signin');
        });

        it('Request with headers', function () {
            assert.equal(
                requests[1].requestHeaders['Content-type'], 
                'application/json;charset=utf-8'
            );
        });

        it('Request with request body', function () {
            const requestBody = JSON.parse(requests[1].requestBody);
            assert.equal(requestBody.login, 'UserName');
            assert.equal(requestBody.password, 'Password123');
        });

    });

    describe('Test PUT method', function () {

        before(function() {
            const form = new window.FormData();
            httpService.put('/user/profile/avatar', {
                data: JSON.stringify(Object.fromEntries(form.entries()))
            });
        });

        it('Request method is PUT', function () {
            assert.equal(requests[2].method, 'PUT');
        });

        it('Request has correct url', function () {
            assert.equal(requests[2].url, 'https://ya-praktikum.tech/api/v2/user/profile/avatar');
        });

        it('Request has no credentials by default', function () {
            assert.notEqual(requests[2].withCredentials, true);
        });

    });

    describe('Test DELETE method', function () {

        before(function() {
            const chatId = 123;
            httpService.delete('/chats', {
                data: JSON.stringify({ chatId }),
            });
        });

        it('Request method is PUT', function () {
            assert.equal(requests[3].method, 'DELETE');
        });

        it('Request has correct url', function () {
            assert.equal(requests[3].url, 'https://ya-praktikum.tech/api/v2/chats');
        });

        it('Request has ID in request body', function () {
            const requestBody = JSON.parse(requests[3].requestBody);
            assert.equal(requestBody.chatId, 123);
        });

    });
});
