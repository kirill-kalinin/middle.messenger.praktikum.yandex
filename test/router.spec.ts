import Router from '../src/core/router/router';
import { assert } from 'chai';

let router: Router | undefined;

describe('Router test', function() {
    before('Console.log constructor', function() {
        console.log(Router.constructor.toString());
    });
    describe('First test', function() {
        it('Tells me nothing', function() {
            assert.isFalse(router instanceof Router);
        });
    });
});
