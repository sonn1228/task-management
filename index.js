const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();

const database = require('./config/database');
database.connect();

const routes = require('./api/v1/routes/index.route');
routes(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
