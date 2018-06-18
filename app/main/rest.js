'strict mode';

const http = require('http');


function readData(response) {
    let data = '';
    return new Promise((resolve, reject) => {
        response.on('data', chunk => { data += chunk; });
        response.on('end', () => resolve(data));
    });
}

module.exports = {
    get: function(url) {
        return new Promise(async (resolve, reject) => {
            http.get(url, async res => {
                if (res.statusCode === 200) {
                    const content = await readData(res);
                    resolve({ content, headers: res.headers });
                } else {
                    reject(`${res.statusCode}: Error`);
                }
            });
        });
    }
}
