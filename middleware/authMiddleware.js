const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get the token from the request header
  // The frontend will send it like: "x-auth-token: <the_long_token_string>"
  const token = req.header('x-auth-token');

  // 2. Check if there is no token at all
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify the token
  try {
    // Decode the token using your Secret Key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user to the request
    // Now, every route AFTER this middleware can access 'req.user'
    req.user = decoded; 
    
    // 5. Allow the request to move to the next step (the actual route)
    next(); 
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};