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

    console.log(ctx.method);

    ctx.method = 'POST';

    await next();

    console.log(ctx.method, ctx.request.method);

    console.log('第一次', 'end');
    const endTs = new Date().getSeconds();

    console.log(`耗时：${endTs - startTs}s`);

    // TODO: this
    ctx.res.end();
});

app.use(function (ctx, next) {
    console.log('第二次', 'start');

    console.log(ctx.method);
    console.log(ctx.req.method);

    next();
    console.log('第二次', 'end');
});

app.use(async function (ctx, next1) {
    console.log('第三次', 'start');
    next1();
    console.log('第三次', 'end');
});

app.use(async function (ctx, next) {
    console.log('第四次', 'start');
    console.log('sleep 1s');
    for (var start = +new Date; +new Date - start <= 1000;) {  // sleep 1s
    }
    console.log('第四次', 'end');
});