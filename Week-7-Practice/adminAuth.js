const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function adminAuth(req, res, next) {
  try {
    const token = req.headers.token;

    if(!token){
        return res.status(404).json({
            msg:"Sign in again"
        })
    }

    const dec = jwt.verify(token, JWT_SECRET);
    console.log(token);
    if(dec){
        if(dec.role!=="admin"){
            return res.status(401).json({
                msg:"Only admin allowed"
            })
        }
        req.id=dec.id;
        next();
    }
    else{
        return res.status(404).json({
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
  adminAuth,
};
