'strict mode';

const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

class HttpClient {
    constructor(endpoint, headers = {}) {
        const { protocol, hostname, port, path } = url.parse(endpoint);
        this.service = protocol === 'http:' ? http : https;
        this.options = {
            hostname,
            port,
            path,
            headers
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
        return new Promise(async (resolve, reject) => {
            const { statusCode, headers } = response;
            if (statusCode === 200) {
                const content = await this.readResponse(response);
                resolve({ content, headers });
            } else {
                response.resume();
                reject(new Error(`${res.statusCode}: Error`));
            }
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

    doPost(data) {
        const postData = querystring.stringify(data);
        const options = Object.assign({}, this.options, { method: 'POST' });
        return new Promise((resolve, reject) => {
            const request = this.service.request(options, response => {
                this.handleResponse(response)
                    .then((res) => resolve(res), (error) => reject(error));
            });

            request.write(data);
            request.end();
        });
    }
}



module.exports = {
    get: function(url) {
        const client = new HttpClient(url);
        return client.doGet();
    },
    post: function(url, data) {
        const client = new HttpClient(url);
        return client.doPost(data);
    }
}
