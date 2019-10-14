const TVO = require('./tVO');

module.exports = class TBlogs extends TVO {
    constructor() {
        super();
        this.ClassName = TBlogs;

        this.id = null;
        this.title = null;
        this.content = null;
        this.createtime = null;
        this.author = null;
    }
};
