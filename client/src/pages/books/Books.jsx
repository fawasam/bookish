import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {motion } from 'framer-motion'
import './Books.css'

import Filter from './Filter';
import Book from './Card';



const Books = () => {
   const [all,setAll] =useState([]);
  const [filtered ,setFiltered] =useState([]); 
  const [activeGenre ,setActiveGenre] =useState(0)
  const [item ,setItem] =useState(false)

  //here needs redux
  const fetchPopular = ()=>{
    axios.get('/api/books').then((response)=>{
      const books =response.data
      setAll(books)
      setFiltered(books)
    })
  }
  useEffect(()=>{
    fetchPopular()
  },[]) 

  
  
  return (
    <div className="books-container">

      
      <Filter 
      activeGenre={activeGenre}
      all={all} 
      setFiltered={setFiltered} 
      setActiveGenre={setActiveGenre} 
      setItem={setItem}
       />

      <motion.div  
      layout 
      className="popular-books">
        {/* <AnimatePresence> */}
        {filtered.map(book =>{
          return(
            <Book key={book._id} book={book} item={item} />
            
            )
          })}
          {/* </AnimatePresence> */}
      </motion.div>
    </div>
  )
}

export default Books