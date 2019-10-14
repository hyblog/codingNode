const NODE_ENV = process.env.NODE_ENV || 'dev';

let MYSQL_CONFIG;
let REDIS_CONFIG;

if (NODE_ENV === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'myblog'
    };

    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    };
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
};