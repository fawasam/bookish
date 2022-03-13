import  jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async(req,res,next) =>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token =req.headers.authorization.split(" ")[1]
            console.log(token);
            const decoded =jwt.verify(token , process.env.JWT_SECRET)
            req.user  =await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
        return res.status(400).json({errors:[{msg: 'token not found'}]})
        }
    }
    if(!token){
        return res.status(400).json({errors:[{msg: ' protected Un authorized '}]})
    }
})

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }else{
        return res.status(401).json({errors:[{msg: 'Not authorized as an admin'}]})
    }
}
export { protect,admin}