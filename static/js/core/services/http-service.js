export var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["POST"] = "POST";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
;
export default class HTTPService {
    constructor() {
        this.get = (url, options = {}) => {
            const queryString = options.data ? url + this._queryStringify(options.data) : url;
            return this._request(queryString, { method: METHODS.GET }, options.timeout);
        };
        this.put = (url, options = {}) => {
            return this._request(url, { ...options, method: METHODS.PUT }, options.timeout);
        };
        this.post = (url, options = {}) => {
            return this._request(url, { ...options, method: METHODS.POST }, options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this._request(url, { ...options, method: METHODS.DELETE }, options.timeout);
        };
        this._request = async (url, options = { method: METHODS.GET }, timeout = 5000) => {
            const { method, data } = options;
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.timeout = timeout;
                xhr.ontimeout = reject;
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
    _queryStringify(data) {
        let queryString = '';
        if (typeof data === 'object' && data !== null) {
            for (let param in data) {
                queryString += queryString ? '&' : '?';
                queryString += `${String(param)}=${String(data[param])}`;
            }
        }
        return queryString;
    }
}
//# sourceMappingURL=http-service.js.map