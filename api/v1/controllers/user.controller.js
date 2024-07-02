const md5 = require('md5');
const User = require('../models/user.model');

module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    console.log(req.body);

    res.json({
      code: 200,
      message: 'Success'
    })
  } catch (error) {
    res.json(error)
  }
}