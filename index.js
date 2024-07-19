const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
// const cookieParser = require('cookie-parser')

// app.use(cookieParser());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// database
const database = require('./config/database');

const port = process.env.PORT
database.connect();
const routesApiVer1 = require("./api/v1/routes/index.route");
routesApiVer1(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
