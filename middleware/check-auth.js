const jwt =require("jsonwebtoken");
require("dotenv").config();

module.exports=((req,res,next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded=jwt.verify(token,process.env.jwt_key);
        req.body.userData=decoded;
        next();
    }catch(err){
        console.log("it not there");
        return res.status(401).json({
            message:'Auth failed'
        })
    }
});