const express = require('express')
const app = express()
const port = 3000

const Task = require('./models/task.model');

const database = require('./config/database');
database.connect();

require('dotenv').config()
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
})


app.get('/tasks/detail/:id', async (req, res) => {
  try {
    const tasks = await Task.findOne({
      deleted: false,
      _id: req.params.id
    });
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
