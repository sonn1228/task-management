const Task = require('../models/task.model');
const objPaginationHelper = require('../../../helpers/objPagination.helper');

// [GET]/api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    let find = { deleted: false };

    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, 'i');
      find.title = regex;
    }

    if (req.query.status) {
      find.status = req.query.status;
    }

    const objPagination = objPaginationHelper(req);

    const tasks = await Task.find(find)
      .limit(objPagination.limitItems)
      .skip(objPagination.skipItems);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
}

// [GET]/api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
}

// [PATCH]/api/v1/tasks/changeStatus/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const updateResult = await Task.updateOne({ _id: id }, req.body);

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "Task not found or no changes made" });
    }

    res.json({ code: 200, message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
}

// [PATCH]/api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;
    switch (key) {
      case 'status':
        await Task.updateMany({ _id: ids }, {
          status: value
        })
        break;
      case 'deleted':
        await Task.updateMany({ _id: ids }, {
          deleted: value
        })
        break;
      case 'status':

        break;
      default:
        break;
    }
    res.json({ code: 200, message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
}

// [POST]/api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.json({ code: 200, message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
}

// [POST]/api/v1/tasks/create
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Task.updateOne({ _id: id }, req.body);
    res.json({ code: 200, message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
}