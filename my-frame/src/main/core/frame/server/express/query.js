/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (处理HTTP请求中的Get参数)
 * @date 2019-10-14 19:40
 * @version V1.0
 */

const querystring = require('querystring');

module.exports = class Query {
    /**
     * @param req HTTP请求上下文
     * @param res HTTP响应上下文
     */
    constructor(req = null, res = null) {
        if (req == null || res == null) {
            throw TypeError('Can requests and response not be empty!');
        }
        this.req = req;
        this.res = res;
        this.query = this.parseQuery.bind(this);
    }

    /**
     * @name 解析HTTP中Get参数
     * @return {ParsedUrlQuery | undefined}
     */
    parseQuery(){
        return querystring.parse(this.req.url.split('?')[1]) || undefined;
    }
};