import HTTPService from '../src/modules/http-services/http-service';
import { assert } from 'chai';

let httpService: HTTPService | undefined;

describe('HTTP Test', () => {
    before('Console.log constructor', function() {
        console.log(HTTPService.constructor.toString());
    });
    describe('First test', function() {
        it('Tells me nothing', function() {
            assert.isFalse(httpService instanceof HTTPService);
        });
    });
});
