const express = require('express')
const router = express.Router()
const controller = require('../controllers/task.controller');

// [GET] /api/v1/tasks
router.get('/', controller.index);

// [GET] /api/v1/tasks/detail/:id
router.get('/detail/:id', controller.detail);

// http://localhost:3000/api/v1/change-status/6673e240e99f24a0a365d597
router.patch('/change-status/:id', controller.changeStatus);

// http://localhost:3000/api/v1/change-multi
router.patch('/change-multi', controller.changeMulti);


// http://localhost:3000/api/v1/create
router.post('/create', controller.create)


module.exports = router; 