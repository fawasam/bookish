import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import User from "../models/userModel.js"


// @desc   update saved books
// @route  PUT  /api/savebooks/:id
// @access Private

const saveBook = asyncHandler (async(req,res)=>{

    try {
        
        const savedBooks =req.params.id
        const user =await User.findByIdAndUpdate({ _id :req.user.id},{
            $addToSet:{
                savedBooks:savedBooks
            }
        })
        if(user){

            res.status(201).json(user)
        }else{
            res.status(404).json({errors:[{msg: 'book not found'}]})
        }
           
    } catch (error) {
            res.status(404).json({error:message})
        
    }
})


// @desc   list saved books
// @route  GET /api/books/savebooks/:id
// @access Private

const listSavedBook = asyncHandler (async(req,res)=>{

    try {
        const user =await User.findById(req.params.id)
        if(user){
           const books =user.savedBooks
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



// @desc   delete saved books
// @route  DELETE /api/books/savebooks/:id
// @access Private/admin

const deleteSaveBook = asyncHandler (async(req,res)=>{

    try {   
        const savedBooks =req.params.id
        console.log(savedBooks ,req.user.id)
        const user =await User.findByIdAndUpdate({ _id :req.user.id},{
            $pull:{
                savedBooks
            }
        })
        if(user){
            const savebook = await user.save()
            res.status(201).json(savebook)
        }else{
            res.status(404).json({errors:[{msg: 'book not found'}]})
        } 
    }
    
    catch (error) {
        res.status(404).json(error)
        console.log(error);
       
    } 
})


export {
    saveBook,
    deleteSaveBook,
    listSavedBook
}
