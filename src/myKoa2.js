const http = require('http');


// 中间件处理
function middlewareHandler(middlewareList) {
    // 组合函数
    return function (ctx) {
        function dispatch(p) {
            const func = middlewareList[p];
            if (typeof func !== 'function') {
                throw new TypeError('Router.use() requires a middleware function but got a');
            }
            try {
                return Promise.resolve(
                    func(ctx, dispatch.bind(null, p + 1))
                )
            } catch (e) {
                throw e;
            }
        }

        return dispatch(0);
    };
}

class MyKoa2 {
    constructor() {
        this.middlewareList = [];
    }

    use(fn) {
        if (!fn) {
            throw new TypeError('Router.use() requires a middleware function but got a');
        }
        this.middlewareList.push(fn);
        return this;  // use().use()
    }

    generateContext(req, res) {
        return {
            request: req,
            response: res
        }
    }

    handlerRequest(ctx, func) {
        return func(ctx);
    }

    callback() {
        const func = middlewareHandler(this.middlewareList);

        return async (req, res) => {
            const ctx = this.generateContext(req, res);
            this.handlerRequest(ctx, func);
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
}

module.exports = MyKoa2;