const express = require('express');
const router = express.Router();
const MongoModel = require('./mongodbDriver/connection')

async function mongoCall(recordsNumber) {
    let mongo = await new MongoModel();
    return await mongo.asyncFetch(recordsNumber);
}

router.get('/', (req, res) => {
    const recordsNumber = Number(req.query.n);
    if (!recordsNumber)
        res.status(400).send('numbers only');
    else {
        mongoCall(recordsNumber).then(resu => {
            res.status(200).send({time: resu});
        }).catch(e => {
            res.status(400).send({error: e});
        })
    }
})

module.exports = router;
