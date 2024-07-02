const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.index)
router.get('/detail/:id', controller.detail)
router.patch('/change-status/:id', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.post('/create', controller.create)


module.exports = router;


/**
// /api/v1/tasks?status=initial
// /api/v1/change-status/:id
 * 
 * 
 */