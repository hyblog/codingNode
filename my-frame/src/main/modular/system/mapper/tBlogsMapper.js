const MysqlBean = require('../../../config/mysqlBean');
const TBlogs = require('../vo/tBlogs');



module.exports = new class TBlogsMapper{

    constructor(){
        this.mysql = MysqlBean.getInstance();
        this.selectByAll = this.querySelectByAll.bind(this);
    }

    querySelectByAll() {
        return (async () => {
            return new TBlogs().toMapperMapping(
                await this.mysql.selectBySql('select * from blogs;')
            );
        })();
    }
};