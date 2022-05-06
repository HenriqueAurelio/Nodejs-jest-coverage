const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    
     const { authorization } = req.headers;

     if (!authorization)
     {
        console.log('oi')
        return res.sendStatus(401);
     }
     const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = data
        req.userId = id; 
        return next();
      } catch {
         return res.sendStatus(401);
     }
}
module.exports = auth;