import React, { useState } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { useEffect } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import Book from '../books/Card'
import  '../books/Books.css'
// import {listSavedBooks} from '../../redux/actions/bookAction'
const SavedBooks = () => {

    const [book ,setBooks] = useState([])

	  const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin
    const listSavedBook =useSelector(state =>state.listSavedBook)
    // const bookSave =useSelector(state =>state.bookSave)
    // const { loading, success, book} =bookSave
    const { loading} =listSavedBook

    
    const fetchSavedBooks = () =>{
      axios.get(`/api/books/savebooks/${userInfo._id}`).then((response)=>{
        const savedBooks=response.data
        setBooks(savedBooks)
      })
    }
    useEffect(()=>{
      //  dispatch(listSavedBooks(userInfo._id))
      fetchSavedBooks()
      // setBooks(book)

    },[dispatch , fetchSavedBooks ])
  return (
   
    <motion.div
    layout 
    className="popular-books">
      <>

      {loading ? <> 
      <h1>Loading</h1>
      </>:
      <>
       {book.map(book=>{
         return(
           <Book key={book._id} book={book} /> 
           )})}
        </>
      }
      </>
      
    </motion.div>
  )
}

export default SavedBooks