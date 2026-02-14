const jwt = require('jsonwebtoken');
require("dotenv").config
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;


function auth(req,res,next){
    try {
        const token = req.headers.token;

        const dec = jwt.verify(token,JWT_SECRET);

        if(dec){
            req.userId = dec.id;
            next();
        }
        else{
            res.status(403).json({
                msg:"Incorrect credentials"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg:"Something went wrong"
        })
    }
}


module.exports={
    JWT_SECRET:JWT_SECRET,
    MONGO_URL:MONGO_URL,  
    auth
}
