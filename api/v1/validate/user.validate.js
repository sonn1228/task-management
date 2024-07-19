module.exports.register = async (req, res, next) => {

  if (!req.body.password) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  next();
}
module.exports.login = async (req, res, next) => {

  if (!req.body.password) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  next();
}
module.exports.forgotPassword = async (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: 'error'
    })
    return;
  }
  next();
}
