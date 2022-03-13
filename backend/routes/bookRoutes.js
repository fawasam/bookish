import express from'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'
import {
    getBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook,
    createBookReview
    
} from '../controllers/bookController.js'

import {
    saveBook,
    deleteSaveBook, 
    listSavedBook,
    
} from '../controllers/saveBookController.js'


// @route  http://localhost:5000/api/books




router.post('/' ,protect, createBook) 
router.post('/:id/review' ,protect,createBookReview) 

router.get('/' ,getBooks) 
router.put('/:id',protect, updateBook) 
router.get('/:id',getBooksById)
router.delete('/:id' ,protect, deleteBook)

//savebooks
router.put('/savebooks/:id',protect, saveBook) 
router.get('/savebooks/:id', listSavedBook)  //protected
router.delete('/savebooks/:id',protect, deleteSaveBook) 







export default router