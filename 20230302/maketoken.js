
const jwt = require('jsonwebtoken');

 // Access Token 발행 함수
function generateAccessToken(userId) {
    const accessToken = jwt.sign({ Id: userId }, 'accesstoken', { expiresIn: '1m' });
    return accessToken;
  }
  
  // Refresh Token 발행 함수
  function generateRefreshToken(userId) {
    const refreshToken = jwt.sign({ Id: userId }, 'refreshtoken',{
        expiresIn : '24h'
    });
    return refreshToken;
  }
  //Access Token 디코딩해서 판별하는 함수
  function verifyAccessToken(req, res,next) {
    
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'Access Token not found' });//post 방식으로 받았기 때문에 redirect로 처리
    }
  
     jwt.verify(accessToken, 'accesstoken', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Access Token is not valid' });
      }
      req.userId =decoded.Id;
      next();
    })
    
  }
  //Refresh Token 디코딩 해서 판별하는 함수
  function verifyRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    console.log("환아 힘내");
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found' });
    }
  
    jwt.verify(refreshToken, 'refreshtoken', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh Token is not valid' });
      }
      const userId = decoded.Id;
      const accessToken = generateAccessToken(userId);
      const refreshToken =generateRefreshToken(userId);
    req.Id = userId;
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
    next();
      
    });
  }
  
  
  
  
  module.exports= {Gat:generateAccessToken, Grt: generateRefreshToken, vat:verifyAccessToken, vrt:verifyRefreshToken };
