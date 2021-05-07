

exports.default = (req, res) => {
    req.serverMsg = {msg: "Server up and running" }
    res.status(200).json(req.serverMsg);
}

exports.notFoundDefaultRoute = (req, res) => {
    res.status(404).json({ errors: [{location: req.path, msg: 'Not found', param: null}]});
}

exports.basicAuthRoute = (req, res, next) => {
  const auth = {login: process.env.AUTHLOGIN, password: process.env.AUTHPASSWORD}

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (login && password && login === auth.login && password === auth.password) {
    return next()
  }
  
  res.status(401).json({ errors: [{location: req.path, msg: 'Authentication required', param: null}]})
}

exports.granted = (req, res) => {
    req.serverMsg = {msg: "ok" }
    res.status(200).json(req.serverMsg);
}