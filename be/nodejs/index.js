require("@babel/register")
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pubRoutes = require('./publics.js');
const mysqlRoutes = require('./routes/api/mysql/mysql');
const mongoRoutes = require('./routes/api/mongo/mongo');
const postgresRoutes = require('./routes/api/postgreSQL/postgreSQL');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/pub', pubRoutes);
app.use('/mysql', mysqlRoutes);
app.use('/mongo', mongoRoutes);
app.use('/postgres', postgresRoutes);


app.listen(8080, async () => {
    console.log('app working on 8080')
})





// mongo: 100k=0.7385487290024757  200k=1.355209684997797       400k=2.713735625997186
// 600k=3.7990200310051443      800k=5.057500010997057
// 1mil=6.305505346000195    2mil=13.83225756600499  4mil=28.571796380996705
// 6mil=42.26020047099888      8mil=56.172663981989025    10mil=75.16612790299952

