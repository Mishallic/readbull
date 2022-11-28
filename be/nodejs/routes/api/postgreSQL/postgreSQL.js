const express = require('express');
const router = express.Router();
const PostgresSqlConnection = require('./connection')

let startTime, endTime;

function execSql(con, recordsNumber) {
    return new Promise(function (res, rej) {
        con.query(`select * from dataset limit ${recordsNumber}`, function (e, data) {
            if (e)
                rej(e)
            if(data.rowCount)
                res(data)
            else
                rej('none')
        })
    });
}

router.get('/', (req, res) => {
    const recordsNumber = Number(req.query.n);
    if (!recordsNumber)
        res.status(400).send('numbers only');
    else {
        const con = PostgresSqlConnection.getInstance();

        startTime = performance.now();
        execSql(con, recordsNumber).then(resu=>{
            endTime = performance.now();
            res.status(200).send({time:(endTime - startTime) / 1000})
        }).catch(e=>{
            res.status(400).send(e)
        })
    }
})

module.exports = router;