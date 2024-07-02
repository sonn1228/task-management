const taskRoutes = require('./task.route');

module.exports = (app) => {
  const version = "/api/v1";

  app.use(`${version}/tasks`, taskRoutes);

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