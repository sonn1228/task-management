const express = require('express')
const router = express.Router()
const Task = require('../../../models/task.model');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.send(error);
    }
})


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