const taskRoutes = require('./task.route');
const userRoutes = require('./user.route');
const authMiddleware = require('../middlewares/auth.middleware');
module.exports = (app) => {
  const version = "/api/v1";

  app.use(`${version}/tasks`, authMiddleware.requireAuth, taskRoutes);
  app.use(`${version}/users`, userRoutes);

}


/**
 * /api/v1/tasks?status=initial
 * /api/v1/tasks?sortKey=abc&sortValue=asc
 * /api/v1/tasks?page=1
 * 
 * 
 * 
 * 
 * 
 */