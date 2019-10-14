/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (用一句话描述该文件做什么)
 * @date 2019-10-14 20:14
 * @version V1.0
 */

module.exports = class Router {
    // 初始化构造函数
    constructor() {
        //this.session = new Map()

        // 注册路由与中间件
        this.routes = {
            use: [],
            get: [],
            post: []
        };

        this.use = this.use.bind(this);
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
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
            Router.register.apply(this, arguments)
        );
    }

    get() {
        this.routes.get.push(
            Router.register.apply(this, arguments)
        );
    }

    post() {
        this.routes.post.push(
            Router.register.apply(this, arguments)
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
};
