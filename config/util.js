const jwt = require('jsonwebtoken');

exports.getToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET||'mysecret',
    {
      expiresIn: '48h',
    }
  );
};

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};