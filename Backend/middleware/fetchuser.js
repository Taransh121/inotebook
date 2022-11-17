const jwt=require("jsonwebtoken");
const jwtSecret = "70707"


const fetchuser=(req,res,next)=>{
    //Get the user from the jwt token and add id to req object. Token mai kahi id hai usko nikalna hai.
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Pls authenticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,jwtSecret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Pls authenticate using a valid token"})
    }

}

module.exports=fetchuser; 