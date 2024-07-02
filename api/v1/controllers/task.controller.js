const Task = require('../models/task.model');

//  [GET]/api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    let find = {};

    if (req.query.status) {
      find.status = req.query.status;
    }

    const tasks = await Task.find(find);
    res.json(tasks);
  } catch (error) {
    res.json(error)
  }
}

//  [GET]/api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id
    });
    res.json(task);
  } catch (error) {

  }
}

