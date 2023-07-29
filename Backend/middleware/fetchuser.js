const jwt = require("jsonwebtoken");
const JWT_SECRET = "Priyanshuisgood$oy";


const fetchuser=(req, res, next)=>{
    //Get The User From The JWT token and add id to req object
    const token= req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please Authanticate Using A Valid Token"})
    }
    try {
        const data =jwt.verify(token, JWT_SECRET );
    req.user=data.user;
    next() 
    } catch (error) {
        res.status(401).send({error: "Please Authanticate Using A Valid Token"})

    }
   
}

module.exports=fetchuser;