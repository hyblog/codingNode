/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (处理HTTP请求中的Cookie)
 * @date 2019-10-14 19:40
 * @version V1.0
 */

module.exports = class Cookie {

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
        this.parse = this.parseCookie.bind(this);
    }

    /**
     * @name 解析http请求中的Cookie
     * @return cookie hashMap
     */
    parseCookie() {
        let cookie = {};
        const rc = this.req.headers.cookie || '';
        rc.split(';').forEach((item) => {
            let it = item.trim();
            if (it) {
                let arr = it.split('=');
                let key = arr[0];
                let val = arr[1];
                cookie[key] = val;
            }
        });
        return cookie
    }
};