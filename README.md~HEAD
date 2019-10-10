MyExpress
====

基于Node原生Http类开发而来，在不依赖任何第三方Node类库，就可以运行；

Description
===========

用于学习Express原理，语法与Express基本一致，但是功能不全，只供学习参考；

TestMyExpress
========

```
const MyExpress = require('../src/myExpress');

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

    res.end("第四次");
}, function (req, res, next) {
    console.log('第五次'); // 不会执行！
});
```


TestMyKoa2
========

```
const myKoa2 = require('../src/myKoa2');

const app = new myKoa2();
app.listen(2000);

/***
 * 测试MyKoa2框架Next中间件原型链调用（圆葱模型）
 * 测试结果：{第一次，第二次，第三次，第四次}
 * {
        第一次 start
        第二次 start
        第三次 start
        第四次 start
        sleep 1s
        第四次 end
        第三次 end
        第二次 end
        第一次 end
        耗时：1s
 * }
 *
 */
app.use(async function (ctx, next) {
    const startTs = new Date().getSeconds();
    console.log('第一次', 'start');

    await next();

    console.log('第一次', 'end');
    const endTs = new Date().getSeconds();

    console.log(`耗时：${endTs - startTs}s`);
    ctx.response.end();
});

app.use(function (ctx, next) {
    console.log('第二次', 'start');
    next();
    console.log('第二次', 'end');
});

app.use(async function (ctx, next) {
    console.log('第三次', 'start');
    next();
    console.log('第三次', 'end');
});

app.use(async function (ctx, next) {
    console.log('第四次', 'start');
    console.log('sleep 1s');
    for (var start = +new Date; +new Date - start <= 1000;) {  // sleep 1s
    }
    console.log('第四次', 'end');
});
```