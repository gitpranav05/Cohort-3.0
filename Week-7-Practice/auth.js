const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  try {
    const token = req.headers.token;
    // console.log(token);
    if(!token){
        return res.status(404).json({
            msg:"Sign in again"
        })
    }

    const dec = jwt.verify(token, JWT_SECRET);

    if(dec){
      req.id=dec.id;
      next();
    }
    else{
        res.status(404).json({
            msg:"Invalid Credentials"
        })
    }

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
}

module.exports = {
  auth,
};
