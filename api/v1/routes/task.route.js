const express = require('express')
const router = express.Router()
const Task = require('../../../models/task.model');


// [GET] /api/v1/tasks
router.get('/', async (req, res) => {
    try {
        const find = {
            deleted: false,
        }
        if (req.query.status) {
            find.status = req.query.status;
        }
        console.log(req.query);
        // sort
        const objSort = {}
        if(req.query.sortKey && req.query.sortValue){
            objSort[req.query.sortKey] = req.query.sortValue;
        }
        // obj sort
        const tasks = await Task.find(find).sort(objSort);
        res.json(tasks);
    } catch (error) {
        res.send(error);
    }
})

// [GET] /api/v1/tasks/detail/:id
router.get('/detail/:id', async (req, res) => {
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

module.exports = router;