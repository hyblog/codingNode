const http = require('http');
const querystring = require('querystring');

class MyExpress {

    // 初始化构造函数
    constructor() {
        //this.session = new Map()

        // 注册路由与中间件
        this.routes = {
            use: [],
            get: [],
            post: []
        }
    }

    // 注册路由与中间件
    static register(path) {
        const info = {
            path: '/',
            stack: [] //middle func
        };

        // 当未传入中间件时抛出异常
        if (typeof arguments !== 'object')
            throw new TypeError('app.use() requires a middleware function');

        let i = 0;
        if (typeof arguments[0] === 'string') {
            info.path = arguments[0];
            i++;
        }

        // args demo：path: string,  middleware: function ...
        // args demo：middleware: object ...
        for (i; i < arguments.length; i++) {
            if (typeof arguments[i] !== 'function') {
                throw new TypeError('Router.use() requires a middleware function but got a');
            }
            info.stack.push(arguments[i]);
        }
        return info;
    }

    use() {
        this.routes.use.push(
            MyExpress.register.apply(this, arguments)
        );
    }

    get() {
        this.routes.get.push(
            MyExpress.register.apply(this, arguments)
        );
    }

    post() {
        this.routes.post.push(
            MyExpress.register.apply(this, arguments)
        );
    }

    // 匹配路由
    match(req, res) {
        // not resultful
        if (!req.method) return [];

        const method = req.method.toLowerCase();
        const url = req.url.split('?')[0] || req.url;

        let stack = [];
        let routes = this.routes.use;
        routes = routes.concat(this.routes[method]);

        // console.log(routes, this.routes[method], method);
        routes.forEach((item) => {
            // 压栈
            if (url.indexOf(item.path) === 0 && item.stack.length > 0) {
                stack = stack.concat(item.stack);
            }
        });
        return stack;
    }

    // 定义上下文函数函数, 执行中间件
    handler(req, res, stack) {
        // 404
        if (stack.length === 0) {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end();
            return;
        }

        const next = () => {
            let middleFunc = stack.shift();
            if (!middleFunc || typeof middleFunc !== 'function') {
                throw new TypeError('Router.use() requires a middleware function but got a');
            }
            middleFunc(req, res, next)
        };
        next()
    }

    cookie(req) {
        let cookie = {};
        const rc = req.headers.cookie || '';
        rc.split(';').forEach((item) => {
            let it = item.trim();
            if (it) {
                let arr = it.split('=');
                let key = arr[0];
                let val = arr[1];
                cookie[key] = val;
            }
        });
        return cookie
    }

    static query(req) {
        return querystring.parse(req.url.split('?')[1]) || undefined;
    }

    json(res) {
        return (data = undefined) => {
            res.setHeader('Content-type', 'application/json');
            res.end(
                JSON.stringify(data)
            )
        };
    }

    body(req) {
        return new Promise((resolve, reject) => {
            if (!req ||
                req.method !== 'POST' ||
                req.headers['content-type'] !== 'application/json') {
                return resolve({});
            }

            let postData = '';
            req.on('data', (chunk) => {
                postData += chunk.toString('utf8');
            });

            req.on('end', () => {
                if (!postData) {
                    return resolve({});
                }
                return resolve(
                    JSON.parse(postData)
                );
            })
        });
    }

    callback() {
        return async (req, res) => {
            // req.session =
            req.cookie = this.cookie(req);      // 分装cookie函数
            res.json = this.json(res);          // 分装Json函数
            req.query = MyExpress.query(req);   // 分装Query函数
            req.body = await this.body(req);    // 分装Post-Body函数

            // 获取已匹配路由的中间件
            let middleStack = this.match(req, res);
            if (middleStack) {
                this.handler(req, res, middleStack);
            }
        }
    }

    // 创建http监听服务器
    listen(...args) {
        const httpServer = http.createServer(this.callback());
        httpServer.listen(...args);
    }
}

// 工厂模式，创建MyExpress
module.exports = () => {
    return new MyExpress()
};