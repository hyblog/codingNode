const mysql = require('mysql');
const {MYSQL_CONFIG} = require('./datasource/database');

class MysqlBean {
    // 构造
    constructor() {
        this.conf = MYSQL_CONFIG;
        this.conn = this.connMysql.apply(this);
        this.mysql = mysql;

        this.selectBySql = this.querySelect.bind(this);
        this.asyncSelectBySql = this.queryAsyncSelect.bind(this);
    }

    // 连接Mysql
    connMysql() {
        const conn = mysql.createConnection(this.conf);
        conn.connect();
        return conn;
    }

    // 查询处理
    querySelect(sql, resultMap = null) {
        return new Promise(((resolve, reject) => {
            this.conn.query(sql, (err, rows) => {
                if (err) {
                    return resolve(null);
                }
                resolve(rows);
            });
        }));
    }

    // 异步查询
    queryAsyncSelect(sql) {
        this.conn.query(sql, (err, rows) => {
            this.execResult = rows;
        });
    }
}

// 单例模式
MysqlBean.getInstance = () => {
    let instance;
    if (!instance) {
        instance = new MysqlBean();
    }
    return instance;
};

module.exports = MysqlBean;