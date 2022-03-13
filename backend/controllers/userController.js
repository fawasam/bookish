import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Book from "../models/bookModel.js"
import bcrypt, { hash } from 'bcrypt'
import generateToken from '../util/generateToken.js'


// @desc   Register a new user
// @route  POST  /api/users/register
// @access Public

const registerUser = asyncHandler(async(req,res) => {
   let {name ,email ,password} = req.body
   const userExist =await User.findOne({email})
   if(userExist){
    return res.status(400).json({errors:[{msg: 'User exist already'}]})
   }
   const salt = await bcrypt.genSalt(10)
   password =await bcrypt.hash(password,salt)
   
   const user = await User.create({
       name,
       email,
       password
   })
   if(user){
       res.status(201).json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
         token:generateToken(user._id)
     })
   }
   else{
       res.status(400).json({errors:[{ms:'Invalid user data'}]})
   }
})



// @desc   Auth user & get token
// @route  POST  /api/users/login
// @access Public

const authUser = asyncHandler(async(req,res) => {
   const {email ,password} = req.body
   const user =await User.findOne({email})

    if(!user){
        return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
     }

    const isMatch = await bcrypt.compare(password ,user.password)

    if (isMatch) {
     res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
         savedBooks:user.savedBooks,
         Mybook:user.Mybook,
         token:generateToken(user._id)
     })
   }
   else{
     return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
   }
})


// @desc   get user profile
// @route  GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async(req,res) => {
   const user =await User.findById (req.user._id)
   console.log(user);

    if (user) {
     res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
        savedBooks:user.savedBooks,
         Mybook:user.Mybook
     })
   }
   else{
     return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
   }
})



// @desc   update user profile
// @route  PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req,res) => {
   const user =await User.findById (req.user._id)

    if (user) {
      user.name =req.body.name || user.name
      user.email =req.body.email || user.email

      if(req.body.password) {
         const salt = await bcrypt.genSalt(10)
         const password =await bcrypt.hash(req.body.password,salt)
         user.password = password
      }

      const updatedUser =await user.save()

       res.json({
         _id:updatedUser._id,
         name:updatedUser.name,
         email:updatedUser.email,
         isAdmin:updatedUser.isAdmin,
         token:generateToken(updatedUser._id)
     })
   }
   else{
       res.status(400).json({errors:[{msg: 'User not found'}]})

   }
})


// @desc   get all users
// @route  GET /api/users
// @access Private/Admin
 
const getUsers = asyncHandler(async(req,res) => {
   const user =await User.find({})
   res.json(user)
})


// @desc   delete a user
// @route  DELETE /api/users/:id
// @access Private/Admin
 
const deleteUser = asyncHandler(async(req,res) => {
   const user =await User.findById(req.params.id)
   if(user){
     await user.remove()
     res.json({message :'User  removed'})

   }else{
       res.status(400).json({errors:[{msg: 'User not found'}]})
   }
})


// @desc   GET user BY ID
// @route  GET /api/users/:id
// @access Private/Admin
 
const getUserById = asyncHandler(async(req,res) => {
   const user =await User.findById(req.params.id).select('-password')
   if(user){
     res.json({
         _id:user._id,
         email:user.email,
         isAdmin:user.isAdmin,
         name:user.name,
         savedBooks:user.savedBooks,
         Mybook:user.Mybook
         
     })
   }else{
       res.status(400).json({errors:[{msg: 'User not found'}]})
   }
})

// @desc   update user 
// @route  PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async(req,res) => {

   const user =await User.findById (req.params.id)

    if (user) {
      user.name =req.body.name || user.name
      user.email =req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin

      const updatedUser =await user.save()

       res.json({
         _id:updatedUser._id,
         name:updatedUser.name,
         email:updatedUser.email,
         isAdmin:updatedUser.isAdmin,
     })
   }
   else{
       res.status(400).json({errors:[{msg: 'User not found'}]})

   }
})

// @desc   get user 
// @route  GET /api/users/Mybooks/:id
// @access Private

const listMyBook = asyncHandler (async(req,res)=>{

    try {
        const user =await User.findById(req.params.id)
        if(user){
           const books =user.Mybook
           const book = await Book.find({_id:{$in :[...books]}})   
           if(book){
               res.status(200).json(book)
           }else{
            res.status(404).json({errors:[{msg: 'book not found'}]})
        }

        }else{
            res.status(404).json({errors:[{msg: 'User not authorized'}]})
        }
           
    } catch (error) {
            res.status(404).json({error})
        
    }
})


export { 
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers, 
  deleteUser,
  getUserById,
  updateUser,
  listMyBook
}