const User = require('../models/user.model');
module.exports.requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const user = await User.findOne({
        token: token,
        deleted: false
      }).select('-password')
      if (!user) {
        res.json({
          code: 400,
          message: 'error'
        })
        return;
      }
      req.user = user;
    }
    next();
  }
  else {
    res.json({
      code: 400,
      message: 'error'
    })
  }

}