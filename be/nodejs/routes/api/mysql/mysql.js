const express = require('express');
const router = express.Router();
const MysqlConnection = require('./connection')

let startTime, endTime;

function execSql(con, recordsNumber) {
    return new Promise(function (res, rej) {
        con.query(
            `SELECT * FROM dataset limit ${recordsNumber}`,
            function (err, results) {
                if (err) rej(err);
                else res(results);
            }
        );
    });
}

router.get('/', (req, res) => {
    const recordsNumber = Number(req.query.n);
    if(!recordsNumber)
        res.status(400).send('numbers only');
    else{
        const con = MysqlConnection.getInstance();
        startTime = performance.now();
        execSql(con, recordsNumber).then(() => {
            endTime = performance.now();
            res.status(200).send({time:(endTime - startTime) / 1000})
        })
    }

})

module.exports = router;