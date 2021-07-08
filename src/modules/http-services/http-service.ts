import type { RequestOptionsMethodGet, RequestOptions, RequestOptionsWithMethod } from '../../core/types';

export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export default class HTTPService {
    public get = (url: string, options: RequestOptionsMethodGet = {}): Promise<XMLHttpRequest> => {
        const queryString = options.data ? url + this._queryStringify(options.data) : url;
        return this._request(queryString, {method: METHODS.GET}, options.timeout);
    }

    public put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this._request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    public post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this._request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    public delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this._request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    private _request = async (url: string, options: RequestOptionsWithMethod = {method: METHODS.GET}, timeout = 5000): Promise<XMLHttpRequest> => {
        const {method, data, headers, credentials} = options;

        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, BASE_URL + url);

            headers?.forEach(header => xhr.setRequestHeader(...header));
            if (credentials) {
                xhr.withCredentials = true;
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };

    private _queryStringify(data: {[param: string]: unknown}) {
        let queryString = '';
        if (typeof data === 'object' && data !== null) {
            for (const param in data) {
                queryString += queryString ? '&' : '?';
                queryString += `${String(param)}=${String(data[param])}`;
            }
        }
        return queryString;
    }
}
