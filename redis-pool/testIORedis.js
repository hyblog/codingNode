var Redis = require("ioredis");
var redis = new Redis({
    port: 6379,
    host: '127.0.0.1',
});

function RedisHelper() {
    this.client = new Redis({
        port: 6379,
        host: '127.0.0.1',
    });
}

module.exports = RedisHelper;

RedisHelper.prototype.set = function (key, value, ex) {
    let client = this.client;
    return new Promise(function (resolve, reject) {
        if (!!ex) {
            client.set(key, value, "EX", ex, function (err, res) {
                if (!!err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        } else {
            client.set(key, value, function (err, res) {
                if (!!err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        }
    });
};

RedisHelper.prototype.get = function (key) {
    let client = this.client;
    return new Promise(function (resolve, reject) {
        client.get(key, function (err, res) {
            if (!!err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};