import express from'express'
import { 
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    listMyBook
} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router()

// @route  http://localhost:5000/api/users

router.post("/register" ,registerUser)
router.post('/login' ,authUser)
router.get("/profile" , protect,getUserProfile)
router.put("/profile" , protect,updateUserProfile)
router.get("/:id" ,getUserById)
router.get("/Mybooks/:id" ,listMyBook)


//admin routes
router.get("/" ,protect,admin,getUsers)
router.put("/:id" ,protect,admin,updateUser)
router.delete("/:id" ,protect,admin,deleteUser)



export default router