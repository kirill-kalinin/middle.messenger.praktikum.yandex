import { RequestOptions, RequestOptionsMethodGet } from '../../core/types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseAPI {
    request(_url: string, _options?: RequestOptionsMethodGet): unknown {
        throw new Error('Not implemented');
    }

    update(_url: string, _options?: RequestOptions): unknown {
        throw new Error('Not implemented');
    }

    create(_url: string, _options?: RequestOptions): unknown {
        throw new Error('Not implemented');
    }

    delete(_url: string, _options?: RequestOptions): unknown {
        throw new Error('Not implemented');
    }
}
