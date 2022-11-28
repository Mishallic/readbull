const { Client } = require('pg')

class PostgreSqlConnection {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }

    static getInstance() {
        if (!PostgreSqlConnector.instance) {
            PostgreSqlConnector.instance = new PostgreSqlConnector();
        }
        return PostgreSqlConnector.instance;
    }
}

class PostgreSqlConnector {
    con = '';
    constructor() {
        if (!this.con) {
            this.connect();
            return this.con;
        } else
            return this.con;
    }

    connect() {
        try {
            this.con = new Client({
                user: 'root',
                host: 'postgres',
                database: 'root',
                password: 'root123',
                port: 5432,
            })
            this.con.connect(function(err) {
                if (err) throw err;
                console.log("POSTGRES Connected!");
            });
            return true;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = PostgreSqlConnection;
