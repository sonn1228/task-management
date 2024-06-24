const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config();
app.use(cors());

const port = process.env.PORT;
app.use(cors())
app.use(bodyParser.json());


const database = require('./config/database');
database.connect();

const routes = require('./api/v1/routes/index.route');
routes(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
