const md5 = require('md5');
const User = require('../models/user.model');
const generate = require('../../../helpers/generate.helper');

module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);

    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false
    })
    if (existEmail) {
      res.json({
        code: 400,
        message: 'Existed Email'
      })
    }
    else {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        token: generate.generateRandomString(30)
      });
      await user.save();
      const token = user.token;
      res.cookie('token', token);

      res.json({
        code: 200,
        message: 'Success',
        token: token
      })
    }
  } catch (error) {
    res.json(error)
  }
}