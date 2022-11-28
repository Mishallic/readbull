const mysql = require("mysql2");

class MysqlConnection {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }

    static getInstance() {
        if (!MysqlConnector.instance) {
            MysqlConnector.instance = new MysqlConnector();
        }
        return MysqlConnector.instance;
    }
}

class MysqlConnector {
    con = '';
    constructor() {
        if (!this.con) {
            this.connect();
            return this.con;
        } else
            return this.con;
    }

    createTable() {
        const sql = "CREATE TABLE IF NOT EXISTS dataset (col1 INT, col2 varchar(255), col3 varchar(255), col4 varchar(255), col5 varchar(255), col6 varchar(255), col7 varchar(255), col8 varchar(255)) ";
        this.con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }

    connect() {
        try {
            this.con = mysql.createConnection({
                host: "mysql",
                user: "root",
                password: "root123",
                port: 3306,
                database: 'main'
            });


            this.con.query('SET GLOBAL local_infile=1');
            this.con.connect(function (err) {
                if (err) throw err;
                console.log("MYSQL Connected!");
            });
            this.createTable();
            return true;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = MysqlConnection;
