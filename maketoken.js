
const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
    const accessToken = jwt.sign({ Id: userId }, 'accesstoken', { expiresIn: '1m', issuer : 'About Tech' });
    return accessToken;
  }
  
  // Refresh Token 발행 함수
  function generateRefreshToken(userId) {
    const refreshToken = jwt.sign({ Id: userId }, 'refreshtoken',{
        expiresIn : '24h',
        issuer : 'About Tech',
    });
    return refreshToken;
  }
  function verifyAccessToken(req, res,next) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'Access Token not found' });
    }
  
     jwt.verify(accessToken, 'accesstoken', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Access Token is not valid' });
      }
      
       req.userId = decoded.userId;
      
    });
    return req.userId;
  }
  function verifyRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found' });
    }
  
    jwt.verify(refreshToken, 'refreshtoken', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh Token is not valid' });
      }
  
      const userId = decoded.Id;
      const accessToken = jwt.sign({ Id: userId }, 'accesstoken', { expiresIn: '1m', issuer: 'About Tech' });
      const newRefreshToken = jwt.sign({ Id: userId }, 'refreshtoken', { expiresIn: '24h', issuer: 'About Tech' });
  
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
      req.userId = userId;
      return req.userId;
    });
  }
  
  
  
  
  module.exports= {Gat:generateAccessToken, Grt: generateRefreshToken, vat:verifyAccessToken, vrt:verifyRefreshToken };
