import React from 'react'
import "./Home.css"
import {motion } from 'framer-motion'
const Home = () => {
  return (
  <motion.div
  layout
  animate={{ opacity:1}}
  initial={{opacity:0}}
  exit={{opacity:0 }}
  transition={{duration:0.5}} 
  className='home-container'>
      <div className="home-subcontainer">
        <img src="https://img.freepik.com/free-vector/book-lover-concept-illustration_114360-1067.jpg?w=826" alt="" />
        <h2>A good book has no ending ...</h2>
      </div>
    </motion.div>
  )
}

export default Home