let MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
let url = 'mongodb://root:root123@mongodb:27017/dev';

class MongoConnection {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }

    static getInstance() {
        if (!MongoConnector.instance) {
            MongoConnector.instance = new MongoConnector();
        }
        return MongoConnector.instance;
    }
}

class MongoConnector {
    client;
    constructor() {
        if (!this.client) {
            return this.init();
        }
    }

    async init() {
        return new Promise((res, rej) => {
            this.client = new MongoClient(url);
            this.client.connect().then((c, e) => {
                console.log('MONGO Connected!')
                if (e) rej(e);
                res(c);
            });
        })
    }
}


class MongoModel {
    conObj;
    db;
    col;
    startTime
    endTime;

    constructor() {
        return new Promise((res, rej) => {
            if (!this.conObj) {
                this.init().then((resu) => {
                    this.conObj = resu;
                    this.getCollection();
                    res(this);
                }).catch(e => {
                    rej(e);
                })
            } else res(this)
        })
    }

    init() {
        return new Promise((res, rej) => {
            res(MongoConnection.getInstance());
        })
    }

    getCollection() {
        this.db = this.conObj.db('dev');
        this.col = this.db.collection('dataset');
    }

    executeQuery(recordsNumber) {
        return new Promise((res, rej) => {
            const query = this.col.find().limit(recordsNumber);
            query.toArray(function (d, data) {
                if (data.length) res(data); else rej('no data');
            })
        });
    }

    async asyncFetch(recordsNumber) {
        this.startTime = performance.now();
        await this.executeQuery(recordsNumber)
        this.endTime = performance.now();
        return (this.endTime - this.startTime) / 1000;
    }
}

module.exports = MongoModel;


// con.query('LOAD DATA LOCAL INFILE \'custom_1988_2020.db\' INTO TABLE dataset FIELDS TERMINATED BY \',\' ENCLOSED BY \'"\' LINES TERMINATED BY \'\\n\'',
//     ['../../databases/mysql/data'],
//     function(err) {
//         console.log(err)
//     });
