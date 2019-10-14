const MyExpress = require('../main/core/frame/server/express/myExpress');

// 测试MyExpress框架Http服务注册（工厂模式）
const app = MyExpress();
app.listen(1111);


// 测试MyExpress框架Result路由Use (use >= get || post)
app.use('/test/use', function (req, res) {
    res.end('This path = /test/use');
});


// 测试MyExpress框架Result路由Post
app.use('/test/post', function (req, res) {
    res.end('This path = /test/post');
});


// 测试MyExpress框架Result路由Get
app.use('/test/get', function (req, res) {
    res.end('This path = /test/get');
});

// 测试MyExpress框架中自定义功能函数
app.use('/test/tools', function (req, res) {
    console.log(
        req.query,      // 测试解析Get参数
        req.cookie,     // 测试解析Cookie参数
        req.body        // 测试解析Post参数
    );

    res.json({
        msg: 'Success'
    });                 // 测试返回json格式

});

/***
 * 测试MyExpress框架Next中间件原型链调用
 * 测试结果：{第一次，第二次，第三次，第四次}
 *
 */
// 重复注册use路由/test/middleware
app.use('/test/middleware', function (req, res, next) {
    console.log('第一次');
    next(); //继续执行
});
// 匿名中间件函数
const middle1 = (req, res, next) => {
    console.log('第二次');
    next(); //继续执行
};
// 重复注册post路由/test/middleware
app.get('/test/middleware', middle1, (req, res, next) => {
    console.log('第三次');
    next(); //继续执行
});
// 重复注册post路由/test/middleware
app.get('/test/middleware', (req, res, next) => {
    console.log('第四次');
    /* 停止调用 next(); */

    // res.end("第四次");
    next();
}, function (req, res, next) {
    console.log('第五次'); // 不会执行！

    res.end("第五次");
});