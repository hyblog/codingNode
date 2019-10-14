/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (HTTP扩展程序)
 * @date 2019-10-14 19:40
 * @version V1.0
 */

module.exports = class Extend {

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
        this.json = this.toJson.bind(this);
    }

    /**
     * @name Json扩展函数，返回Json文本，并终止HTTP请求
     * @param data
     * @return {Function}
     */
    toJson(data) {
        return (data = undefined) => {
            this.res.setHeader('Content-type', 'application/json');
            this.res.end(
                JSON.stringify(data)
            )
        };
    }
};