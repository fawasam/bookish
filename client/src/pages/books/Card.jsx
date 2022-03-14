import React from 'react';
import {motion} from 'framer-motion'
import './Books.css'
import  {Link } from 'react-router-dom'


const Book = ({book , item}) => {
  return (
  <motion.div
  layout
  animate={{ opacity:1}}
  initial={{opacity:0}}
  exit={{opacity:0 }}
  transition={{duration:0.5}}
  className='books-img'
  >
    {item ? <h1>no boooks</h1> :<>
    <Link to={`/books/${book._id}`}>
      <div className="saved_card">
      <img className='savedbook_img' src={`${book.image}`} alt="" />
      <div className="card-content">
      <h2>{ `${book.title}`.toUpperCase()}</h2>
      <h3>{`${book.author}`.toLowerCase()}</h3>
      </div>
      </div>
    </Link>
    </> 
    }
  </motion.div>
  )
}

export default Book;
