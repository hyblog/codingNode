const RedisHelper = require('./redisHelper');
// const RedisHelper = require('./testIORedis'); // 旧版demo

const myKoa2 = require('../src/myKoa2');

const redisHelper = new RedisHelper();

const app = new myKoa2();
app.listen(2000);

let count = 0;

const middleware1 = async function (ctx, next) {
    await redisHelper.set('k', count).then(async res => {
        count ++;
    });
    await next();
};

const middleware2 = async function(ctx, next){
    await redisHelper.get('k').then(res => {
        console.log(res);
        ctx.response.end(res.toString());
    });
};

app.use(middleware1);
app.use(middleware2);