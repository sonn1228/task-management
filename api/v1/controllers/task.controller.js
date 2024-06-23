const Task = require('../../../models/task.model');
const paginationHelper = require('../../../helpers/pagination');

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    try {
        const find = {};

        // status
        if (req.query.status) {
            find.status = req.query.status;
        }

        // sort
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
        }

        // pagination
        const objPagination = paginationHelper(req);

        // keyword
        if (req.query.keyword) {
            const regex = new RegExp(req.query.keyword, 'i');
            find.title = regex;
        }

        const tasks = await Task.find(find).sort(sort).skip(objPagination.skipItem).limit(objPagination.limitItem);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.detail = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// [GET] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        await Task.updateOne({
            _id: taskId
        }, {
            status: status
        });
        res.json({
            code: 200,
            message: 'Update successfully',
        })

    } catch (error) {
        res.json({
            code: 400,
            message: 'Not Found',

        })
    }
}


module.exports.changeMulti = async (req, res) => {
    try {
        const key = req.body.key;
        const ids = req.body.ids;
        switch (key) {
            case 'status':
                const value = req.body.value;
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    [key]: value
                })
                break;
            case 'delete':
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                })
                break;
            default:
                break;
        }
        res.json({
            code: 200,
            message: 'Update Successfully'
        })
    }
    catch (error) {
        res.json({
            code: 400,
            message: 'Not Found',

        })
    }
}

// [POST] /api/v1/create
module.exports.create = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const data = await newTask.save();

        res.json({
            code: 200,
            message: 'Create successfully',
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: 'Create Failed'
        })
    }
}


// [PATCH] /api/v1/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({
            _id: id
        }, req.body);

        res.json({
            code: 200,
            message: 'Edit Successfully'
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Edit failed"
        })
    }
}


// [DELETE] /api/v1/edit/:id

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.deleteOne({
            _id: id
        });

        res.json({
            code: 400,
            message: 'Delete successfully',
        })
    } catch (error) {
        res.json({
            code: 400,
            message: 'Delete Failed'
        })

    }
}