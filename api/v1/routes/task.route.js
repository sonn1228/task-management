const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.index)
router.get('/detail/:id', controller.detail)

// * /api/v1/tasks?status=initial

module.exports = router;