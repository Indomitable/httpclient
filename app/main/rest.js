'strict mode';

const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

class HttpClient {
    constructor(request) {
        this.request = request;
        const { protocol, hostname, port, path } = url.parse(request.endpoint);
        this.service = protocol === 'http:' ? http : https;
        this.options = {
            hostname,
            port,
            path,
            headers: request.headers
        };
    }

    readResponse(response) {
        return new Promise((resolve, reject) => {
            response.setEncoding('utf8');
            let responseContent = '';
            response.on('data', (chunk) => { responseContent += chunk; });
            response.on('end', () => { resolve(responseContent); })
            .on('error', (readError) => {
                reject(readError);
            });
        });
    };

    handleResponse(response) {
        return new Promise(async resolve => {
            const { statusCode, headers } = response;
            const content = await this.readResponse(response);
            resolve({
                statusCode,
                headers,
                content
            });
        });
    }

    doGet() {
        const options = Object.assign({}, this.options, { method: 'GET' });
        return new Promise((resolve, reject) => {
            this.service.get(options, response => {
                this.handleResponse(response)
                    .then((res) => resolve(res), (error) => reject(error));
            });
        });
    }

    doPost() {
        const postData = querystring.stringify(request.data);
        const options = Object.assign({}, this.options, { method: 'POST' });
        return new Promise((resolve, reject) => {
            const request = this.service.request(options, response => {
                this.handleResponse(response)
                    .then((res) => resolve(res), (error) => reject(error));
            });

            request.write(postData);
            request.end();
        });
    }
}



module.exports = {
    get: function(request) {
        const client = new HttpClient(request);
        return client.doGet();
    },
    post: function(request) {
        const client = new HttpClient(request);
        return client.doPost();
    }
}
