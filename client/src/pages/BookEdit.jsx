import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link,useNavigate ,useParams  } from 'react-router-dom'
import { Button ,Form, FormGroup, FormLabel, FormControl, FormCheck ,Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader'
import { BOOK_UPDATE_RESET } from '../redux/constants/constants.js'
// import { getUserDetails,updateUser  } from "../../redux/actions/userAction.js"
import { updateBooks ,listBooksDetails } from "../redux/actions/bookAction.js"
import {motion } from 'framer-motion'
import axios from 'axios'
const BookEdit = () => {

    const dispatch =useDispatch()
    const navigate =useNavigate()

    const {id:bookId} =useParams()
    const [title ,setTitle] =useState('')
    const [genre ,setGenre] =useState('')
    const [author ,setAuthor] =useState('')
    const [image ,setImage] =useState('')
    const [language ,setLanguage] =useState('')
    const [url ,setUrl] =useState('')
    const [description ,setDescription] =useState('')
    const [uploading ,setUploading] =useState(false)



    const bookDetails = useSelector(state => state.bookDetails)
    const { error , book ,loading } =bookDetails
    console.log(book);

    const bookUpdate = useSelector(state => state.bookUpdate)
    const { error:errorUpdate ,success:successUpdate } =bookUpdate

    useEffect(()=>{

        if(successUpdate){
            dispatch({type: BOOK_UPDATE_RESET})
            navigate("/admin/bookList")
        }else{           
            if(!book.title  || book._id !== bookId){
                dispatch(listBooksDetails(bookId))
            }else{
                setTitle(book.title)
                setGenre(book.genre)
                setAuthor(book.author)
                setImage(book.image)
                setLanguage(book.language)
                setUrl(book.url)
                setDescription(book.description)
            }
        }
      
    },[ dispatch ,book, bookId  ,successUpdate ])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateBooks({
            _id:bookId,
            title, 
           genre, 
           author,
           image,
           language,
           url,
           description
           
        }))
    
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
        setImage(data)
        setUploading(false)
        } catch (error) {  
            console.log('upload error' , error)
            setUploading(false)
        }
    }

    return (
        <>
        <Link to ='/admin/bookList' className='btn btn-light my-3'>Go Back</Link>
        <Row className='p-5'>
            <h1>Edit Book</h1>
            {loading && <Loader /> }
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(

            <>
    <div className="addbook-container">
        <form 
        action="/book/:id/edit" 
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
              <button type="submit" className="add-book">Edit Book</button>
              </div>
          </form>

      </div></>

            )}
          
        </Row>
        </>
    )
}

export default BookEdit
