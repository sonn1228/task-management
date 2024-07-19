const ForgotPassword = require('../models/forgot-password.model');
const md5 = require('md5');
const User = require('../models/user.model');
const generateHelper = require('../../../helpers/generate.helper');

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
        token: generateHelper.generateRandomString(30)
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
// [POST]/api/v1/users/login
module.exports.login = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  if (!existEmail) {
    res.json({
      code: 400,
      message: "Email not exist"
    })
    return;
  }
  const password = md5(req.body.password);
  if (password != existEmail.password) {
    res.json({
      code: 400,
      message: "Password not exist"
    })
    return;
  }
  const token = existEmail.token;
  res.cookie('token', token);


  res.json({
    code: 200,
    message: 'success',
    token: token
  })
}

module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    res.json({
      code: 400,
      message: "Email not found!"
    })
    return;
  }
  const otp = generateHelper.generateRandomNumber(6);

  const timeExpire = 5;

  const objForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60  // 5 phút
  }
  const forgotPassword = new ForgotPassword(objForgotPassword)
  await forgotPassword.save();

  res.json({
    code: 200,
  })
}




