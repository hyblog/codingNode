/**
 * Created by hy on 2019-10-14.
 * @Package
 * @Description: (处理HTTP-Post参数)
 * @date 2019-10-14 19:40
 * @version V1.0
 */

module.exports = class Body {

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
        this.parse = this.parseBody.bind(this);
    }

    /**
     * @name 解析POST请求参数
     * @return {Promise<any>}
     */
    parseBody(){
        return new Promise((resolve, reject) => {
            if (this.req.method !== 'POST' ||
                this.req.headers['content-type'] !== 'application/json') {
                return resolve({});
            }

            let postData = '';
            this.req.on('data', (chunk) => {
                postData += chunk.toString('utf8');
            });

            this.req.on('end', () => {
                if (!postData) {
                    return resolve({});
                }
                return resolve(
                    JSON.parse(postData)
                );
            })
        });
    }
};