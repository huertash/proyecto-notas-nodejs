const jwt = require ("jsonwebtoken")

const authMiddleware = (req,res, next) => {
    const token = req.header("Authorization").replace("Bearer","")
    if(!token) {
        return rest.status(401).json({message:"no Token"})
    
    } 
try{
    const decoded = jwt.verify(token,"secretkey")
    req.user = decoded
    next()
}catch(error){
    res.status(401).json({message:"Token is not Valid"})
}
}
module.exports = authMiddleware