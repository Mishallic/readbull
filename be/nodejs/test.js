const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('./publics');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/PING', (req, res) => {
    res.send('PONG')
});

router.get('/TEST', (req, res) => {
    let testResponse = {
        portal: 8080,
        healthy: true,
        fallback: '8081'
    }
    res.json(testResponse);
});

route.get('/rnf', (req,res) => {
    res.sendStatus(404);
});

app.listen(8080, async () => {
    console.log('app working on 8080')
})