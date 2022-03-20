import React, { useState } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

import {motion} from 'framer-motion'
import Book from '../books/Card'
import  '../books/Books.css'
import Loader from '../../components/Loader'
// import {listSavedBooks} from '../../redux/actions/bookAction'
const SavedBooks = () => {

    const [book ,setBooks] = useState([])

	  const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin
    const listSavedBook =useSelector(state =>state.listSavedBook)
    const { loading} =listSavedBook

    
    const fetchSavedBooks = () =>{
      axios.get(`/api/books/savebooks/${userInfo._id}`).then((response)=>{
        const savedBooks=response.data
        setBooks(savedBooks)
      })
    }
    console.log(book);
    useEffect(()=>{
      fetchSavedBooks()
    },[dispatch , fetchSavedBooks ])
  return (
   <>
    <Link to ='/books' className='btn btn-light my-3'>Go Back</Link>
    <motion.div
    layout 
    className="popular-books">
      
      {loading && <Loader />}
      {book.length===0 && 
      <div className="no_save">

      <h3>No Saved Books</h3>
      </div>
      }
      { 
      <>
       {book.map(book=>{
         return(
           <Book key={book._id} book={book} /> 
           )})}
        </>
      }
      
      
    </motion.div>
      </>
  )
}

export default SavedBooks