import axios from 'axios'
import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {motion } from 'framer-motion'
import Swal from 'sweetalert2'
import "./AddBook.css"
import { Link, useNavigate } from "react-router-dom";
import {
createBooks
}from "../../redux/actions/bookAction.js"

const AddBook = ({history}) => {

    const dispatch =useDispatch()
    const navigate = useNavigate();
    const [genre,setGenre]=useState();
    const [title,setTitle]=useState();
    const [author,setAuthor]=useState();
    const [description,setDescription]=useState();
    const [language,setLanguage]=useState();
    const [image,setImage]=useState();
    const [url,setUrl]=useState();
    const [uploading ,setUploading] =useState(false)
    
    const bookCreate = useSelector(state => state.bookCreate)
    const { success,error ,loading } =bookCreate

    useEffect(()=>{
      
    },[])


    const submitHandler = (e)=>{
      e.preventDefault()
      dispatch(createBooks(genre,title,author,description,language,image,url))
      navigate("/books")
      
    }
    const uploadFileHandler= async(e)=>{

        const file =e.target.files[0]
        const formData =new FormData()
        formData.append('image' , file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type' :'multipart/form-data'
                }
            }
        const  {data} = await axios.post('/api/upload' , formData , config)
        console.log(data);
        setImage(data)
        setUploading(false)
        } catch (error) {  
            console.log('upload error' , error)
            setUploading(false)
        }
    }

  return (
    <>
    <motion.div
    layout
    animate={{ opacity:1}}
    initial={{opacity:0}}
     exit={{opacity:0 }}
     transition={{duration:0.5}} 
     className="addbook-container">
        <form 
        action="/addbook" 
        method="post" 
        className='form-main'
        onSubmit={submitHandler}
        >
          {/* {error && <div className='error_msg'>{error}</div>} */}
              <div className="main">
                  <div className="mb-3">                  
                      <label for="exampleFormControlInput1" className="form-label">Genre</label><br/>
                      <select 
                      className='options form-control'
                      value={genre} required
                      onChange={e=>setGenre(e.target.value)} >
                         <option >All</option>
                         <option >Action & Adventure </option>
                         <option >Autobiographies</option>
                         <option >Classics</option>
                         <option >Comic </option>
                         <option >Fiction</option>
                         <option >Romance</option>
                         <option >Mystery</option>
                         <option >Science</option>
                         <option >History</option>
                         <option >Horror</option>
                         <option >Others</option>
                       </select>
                </div>

                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Book Title</label><br/>
                      <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Title" 
                      value={title} required
                    onChange={e=>setTitle(e.target.value)}
                      />
                      
                      </div>
                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Book Author</label><br/>
                      <input type="text" className="form-control" id="exampleFormControlInput1" name="author" placeholder="Author"
                      value={author} required
                      onChange={e=>setAuthor(e.target.value)}
                      />
                      </div>
                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Language</label><br/>
                      <input type="text" className="form-control" id="exampleFormControlInput1" name="language" placeholder="Language"
                    value={language} required
                     onChange={e=>setLanguage(e.target.value)}
                      />
                      </div>
                  <div className="mb-3">
                      <label for="exampleFormControlTextarea1" className="form-label">Book Description</label><br/>
                      <textarea className="form-control" id="exampleFormControlTextarea1" name="content" rows="3"
                      placeholder="Description"
                       value={description} required
                       onChange={e=>setDescription(e.target.value)}
                      />
                  </div>
                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Book Image Source</label><br/>
                      <input type="text" 
                      className="form-control"
                      name='image'
                      value={image} 
                       onChange={e=>setImage(e.target.value)}
                      />
                      <input type="file" 
                      className="form-control"
                      required
                       onChange={uploadFileHandler}
                      />
                      </div>
                  <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label">Purchase Link</label><br/>
                      <input type="text" className="form-control" id="exampleFormControlInput1" name="link" placeholder="Link"
                      value={url} required
                      onChange={e=>setUrl(e.target.value)}
                      />
                      </div>
              <button type="submit" className="add-book">Add Book</button>
              </div>
          </form>

      </motion.div></>

  )
}

export default AddBook