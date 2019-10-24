const RedisPool = require('./redisPool');

module.exports = class RedisHelper {
    constructor() {
        this.pool = new RedisPool({
            redis: {
                port: 6379,
                host: '127.0.0.1',
            },
            pool: {
                min: 10,  //tcp线程
                max: 20
            }
        });
        this.commands = RedisHelper.toCommands();
        this.cmd = [];
        this.initCommand.apply(this);   //初始化CMD，绑定Promies
    }

    // 常用CMD，在构造中初始化
    static toCommands() {
        return [
            'keys', 'exists', 'del', 'flushdb', 'expire',  //public
            'set', 'get',                                  //string
            'hmset', 'hset', 'hincrby', 'hget', 'hgetall', //hash
            'sadd', 'smembers', 'scrad', 'srem', 'spop',   //set
            'zadd', 'zadd', 'zcard', 'zrevrangebyscore',   //zset
            'zrevrange', 'zrem', 'zrevrank',
            'lpop', 'rpush', 'llen',                       //list
        ];
    }

    // 在连接池中获取一个线程
    async getConnection() {
        return await this.pool.getConnection();
    }

    // 将用完的线程释放
    async releasePool(client) {
        await this.pool.release(client);
    }

    // 初始化CMD，绑定Promies
    async initCommand() {
        this.commands.forEach(async (cmd) => {
            this.cmd[cmd] = async (...args) => {
                const client = await this.getConnection();
                const result = await client[cmd](...args, async function (err, res) {
                    return new Promise((resolve, reject) => {
                        err && reject(err);
                        resolve(res);
                    });
                });
                await this.releasePool(client);
                return result;
            }
        });
    }

    /*  兼容  */
    async getKeysBySubName(subName) {
        return this.cmd.keys(subName + "*");
    }

    async existsKey(key) {
        return this.cmd.exists(key);
    }

    async del(key) {
        return this.cmd.del(key);
    }

    async cleanUpAll() {
        return this.cmd.flushdb();
    }

    async set(key, value, ex = undefined) {
        if (ex) {
            return this.cmd.set(key, value, 'EX', ex);
        } else {
            return this.cmd.set(key, value);
        }
    }

    async expire(key, ex) {
        return this.cmd.expire(key, ex);
    }

    async get(key) {
        return this.cmd.get(key);
    }

    async setObject(key, object) {
        return this.cmd.hmset(key, object);
    }

    async setFieldForObject(key, field, value) {
        return this.cmd.hset(key, field, value);
    }

    async incFieldForObject(key, field, value) {
        return this.cmd.hincrby(key, field, value);
    }

    // async getScoreFromSortedSet(list, max, min) {
    //     return this.cmd.zremrangebyscore(list, max, min, 'WITHSCORES');
    // }

    async getObject(key) {
        return this.cmd.hgetall(key);
    }

    async getFieldForObject(key, field) {
        return this.cmd.hget(key);
    }

    async addToSet(key, value) {
        return this.cmd.sadd(key, value);
    }

    async getAllFromSet(key) {
        return this.cmd.smembers(key);
    }

    async isMember(key, member) {
        return this.cmd.sismember(key, member);
    }

    async countOfSet(key) {
        return this.cmd.scard(key);
    }

    async removeFromSet(key, value) {
        return this.cmd.srem(key, value);
    }

    async randomPopFromSet(key) {
        return this.cmd.spop(key);
    }

    async addToSortedSet(key, scoreValueArray) {
        return this.cmd.zadd(key, scoreValueArray);
    }

    async countOfSortedSet(list) {
        return this.cmd.zcard(list);
    }

    async getFromSortedSetByMaxAndMin(list, max, min) {
        return this.cmd.zrevrangebyscore(list, max, min, "WITHSCORES");
    }

    async getAllFromSortedSet(list) {
        return this.cmd.zrevrange(list, 0, -1);
    }

    async removeFromSortedSet(list, value) {
        return this.cmd.zrem(list, value);
    }

    async getRankFromSortedSet(list, value) {
        return this.cmd.zrevrank(list, value);
    }

    async leftPopFromList(key) {
        return this.cmd.lpop(key);
    }

    async rightPushToList(key, value) {
        return this.cmd.rpush(key, value);
    }

    async getListLength(key) {
        return this.cmd.llen(key);
    }
};