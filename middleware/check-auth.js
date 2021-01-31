const jwt =require("jsonwebtoken");
require("dotenv").config();

module.exports=((req,res,next)=>{
    try{
        const decoded=null;
        const token=req.cookies.make;
        const token2= req.headers.authorization.split(" ")[1];
        
        if(token){
            decoded=jwt.verify(token,process.env.jwt_key);
            console.log("cookies");
        }
        else if(token2){
            decoded=jwt.verify(token2,process.env.jwt_key);
        }
        req.body.userData=decoded;
        next();
    }catch(err){
        console.log("it not there");
        return res.status(401).json({
            message:'Auth failed'
        })
    }
});