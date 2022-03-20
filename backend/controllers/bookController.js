import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import User from "../models/userModel.js"



// @desc   Fetch all books
// @route  GET  /api/books
// @access Public

const getBooks = asyncHandler(async(req,res) => {

    // const keyword =req.query.keyword ? {
    //     name:{
    //         $regex:req.query.keyword,
    //         $options:'i'
    //     }
    // }:{}
    const books = await Book.find()
    res.json(books)
})




// @desc   Fetch single books
// @route  GET  /api/books/:id
// @access Public

const getBooksById = asyncHandler(async(req,res) => {

 const book =await Book.findById(req.params.id)
    if(book){

        res.json(book)
    }else{
       res.status(404).json({errors:[{msg: 'book not found'}]})

    }
})

// @desc   CREATE a book
// @route  POST  /api/books
// @access Private /Admin

const createBook = asyncHandler(async(req,res) => {

    try {      
        const user = req.user._id;
        const { 
           title, 
           genre, 
           author,
           language,
           url,description,image
           
       }=req.body  
       const book = new Book ({
           user,
           title, 
           genre, 
           author,
           image,
           language,
           url,
           description
        
       })
       const user1 =await User.findById (req.user._id)
       if(user1)
       {
           const createdbook = await book.save()
               const {_id} =createdbook
               const updatedUser=await User.findByIdAndUpdate({_id : req.user._id},{
                   $addToSet:{
                       Mybook:_id
                    }
                })
                res.status(201).json(createdbook )
                // console.log(createBook ,updatedUser)
        
       }else{
          return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
       }

    } catch (error) {
        res.status(400).json({errors:[{ms:'Invalid user data'}]})
        console.log(error);
    }
})

// @desc   UPDATE a book
// @route  PUT  /api/books/:id
// @access Private /Admin

const updateBook = asyncHandler(async(req,res) => {

  const { 
           title, 
           genre, 
           author,
           image,
           language,
           url,
           description
       }=req.body

    const book = await Book.findById(req.params.id)

    if(book){

        book.title =title || book.title
        book.genre =genre || book.genre
        book.author =author || book.author
        book.image =image || book.image
        book.language =language || book.language
        book.url =url || book.url
        book.description =description || book.description

        const updatedbook = await book.save()
        res.status(201).json(updatedbook)

    }else{
       res.status(404).json({errors:[{msg: 'book not found'}]})
    }
})


// @desc   DELET a book
// @route  DELETE  /api/books/:id
// @access Private /Admin

const deleteBook = asyncHandler(async(req,res) => {
    const book = await Book.findById(req.params.id)
    if(book){
        await book.remove()
        res.json({message:'Book removed'})
    }
       res.status(404).json({errors:[{msg: 'book not found'}]})
})


// @desc   CREATE new review
// @route  POST  /api/book/:id/review
// @access Private

const createBookReview = asyncHandler(async(req,res) => {

    const { 
       rating,
       comment,
    }=req.body
 
    //grabing the book that reviewing
    const book = await Book.findById(req.params.id)
    console.log(req.user);

    if(book){
        const alreadyReviewed = book.reviews.find(r=>r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){

            
            res.status(400).json({errors:[{msg:'your review already saved'}]})
        }else{

            const review ={
                user:req.user._id,
                name:req.user.name,
                rating:Number(rating),
                comment
             }
    
            book.reviews.push(review)
            book.numReviews =  book.reviews.length
            book.rating = book.reviews.reduce((acc,item)=>item.rating + acc , 0) / book.reviews.length
            await book.save()
           res.status(201).json({message: 'Review added'})
        }

    }else{
       res.status(404).json({errors:[{msg: 'book not found'}]})
    }
})

export {
    getBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook,
    createBookReview,
    
}