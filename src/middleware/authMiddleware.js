// Authenticate requests with JWT token
const { verifyToken } = require('../config/jwt');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    console.log('starting verify');
    console.log('token',token)
    const decoded = verifyToken(token);
    console.log('verified');
    req.userId = decoded.userId;
    req.fullName = decoded.fullName;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = authenticate;
