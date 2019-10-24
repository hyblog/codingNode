/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (用一句话描述该文件做什么)
 * @date 2019-10-14 19:40
 * @version V1.0
 */
const http = require('http');

const Body   = require('./body');
const Query  = require('./query');
const Cookie = require('./cookie');
const Extend = require('./extend');
const Router = require('./router');
const route = new Router();

class MyExpress {

    // 初始化构造函数
    constructor() {
        this.serverStatus = false; // 服务器状态

        // 路由方法
        this.use  = route.use;     // Result all
        this.get  = route.get;     // Result get
        this.post = route.post;    // Result post
    }

    // 定义上下文函数函数, 执行中间件
    handler(req, res, stack) {
        // return 404
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

    callback() {
        return async (req, res) => {
            // req.session =
            req.cookie = new Body(req, res).parse();     // 分装cookie函数
            res.json   = new Extend(req, res).toJson();  // 分装Json函数
            req.query  = new Query(req, res).query();    // 分装Query函数
            req.body   = new Body(req, res).parse();     // 分装Post-Body函数

            // 获取已匹配路由的中间件
            let middleStack = route.match(req, res);
            if (middleStack) {
                this.handler(req, res, middleStack);
                this.serverStatus = true;              // 服务器状态
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