import React  from 'react'
import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom'
import {motion } from 'framer-motion'
import { Link, useNavigate } from "react-router-dom";
import "./book.css"
import RateEmoji from '../../components/RateEmoji';
import { Row,Col,ListGroup,Button, ListGroupItem,Form ,FormControl, FormLabel, FormGroup} from 'react-bootstrap'
import Swal from 'sweetalert2'
//redux
import {useDispatch , useSelector} from "react-redux"
import {saveBooks, deleteSaveBook ,createBookReview, listBooksDetails} from "../../redux/actions/bookAction.js"
import {getUserDetails} from "../../redux/actions/userAction.js"
import Message from '../../components/Message';
import Rating from '../../components/Rating';
import axios from 'axios';

const Book = () => {

    const navigate = useNavigate();
	  const dispatch =useDispatch()
    const {id} =useParams()


    // const [qty ,setQty] =useState(1)
    const [rating,setRating] =useState(0)
    const [comment,setComment] =useState('')
    const [user,setUser] = useState([])



    
    
    
    const bookDetails =useSelector(state =>state.bookDetails)
    const { book} =bookDetails
    // const userDetails =useSelector(state =>state.userDetails)
    // const { user } =userLogin
    
    // const userId =user.savedBooks
    // console.log(userId);


    
    const userLogin = useSelector(state => state.userLogin)
    
    const { userInfo } =userLogin
    const bookReview =useSelector(state =>state.bookReview)
    const {error:errorReview } =bookReview
    
    const fetchUserById = () =>{
      axios.get(`/api/users/${userInfo._id}`).then((response)=>{
        const userId=response.data
        setUser(userId.savedBooks)
      })
    }
    //   const fetchSavedBooks = () =>{
      //   axios.get(`/api/books/savebooks/${userInfo._id}`).then((response)=>{
        //     const savedBooks=response.data
    //     setBooks(savedBooks)
    //   })
    // }
    const addTosave = ()=>{
      if(!userInfo){
        navigate('/login')  
      }else{
        dispatch(saveBooks(book._id))
        navigate(`/savedbooks/${userInfo._id}`)
      }  
    }
    const removeFromSave = () =>{
      dispatch(deleteSaveBook(book._id))   
      navigate(`/savedbooks/${userInfo._id}`)
    }
    
    const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(createBookReview(id , {
        rating,comment
        }))
        if(errorReview){
          setComment('')
          setRating('')
        }
        
      }
      useEffect(()=>{
        
         dispatch(listBooksDetails(id))
         if(userInfo)
         {
           dispatch(getUserDetails(userInfo._id))
           fetchUserById()
          }
       },[userInfo,dispatch ,id ,book])

  return (
    <>
    <Link to ='/books' className='btn btn-light my-3'>Go Back</Link>
    {book &&
    <motion.div   
    animate={{ opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0 }}
    transition={{duration:0.5}}
    className='book-book'>
    <div className="book-img">
    <img
     src={book.image} className='single_img' height='500' width='500' alt="" /> <br />
     </div>
    <div className="title-book">
    <h1>{book.title}</h1>
    </div>
    <div className='author-book'>
    <span>by</span><h2> { book.author}</h2>
    </div>
    <div className="content-book">
    <p>{book.description}</p>
    <RateEmoji/>
    </div>
        <div className='button-book'>     
        {userInfo && user.includes(book._id) ? <>
       <Button
          type="submit" 
          className="btn btn-save" 
          onClick={removeFromSave}
          >Remove from <b>MY BOOKS</b>
          </Button>      
        </> :  <>
          <Button
          type="submit" 
          className="btn btn-save" 
          onClick={addTosave}
          >Save to <b>MY BOOKS</b>
          </Button>
        </>}
    <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-buy">Buy Now <i className="fas fa-shopping-cart"></i></a>
    </div>
            <Row  className="justify-content-md-center mt-4 p-2">
            <Col md={6}>
                <h2 className='justify-content-md-center'>Reviews</h2>
                {book.reviews.length === 0 && <Message variant="dark">No reviews</Message>}
                <ListGroup variant='flush'>
                    {book.reviews.map(review =>(
                      <ListGroupItem key={review._id}>
                            <strong>{review.name}</strong>
                            
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroupItem>
                    ))}
                    <ListGroupItem className="mt-5">
                        <h2>Write a review</h2>
                        {/* {errorReview && <Message variant='danger'>Review already saved</Message>} */}
                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <FormGroup className="mt-2" controlId='rating'>
                                <FormLabel>Rating</FormLabel>
                                <FormControl 
                                as='select'
                                value={rating}
                                required
                                onChange={(e)=> setRating(e.target.value)}
                                >
                                <option value="">Select </option>
                                <option value="1"> 1 - poor </option>
                                <option value="2"> 2 - Fair </option>
                                <option value="3"> 3 - Good </option>
                                <option value="4"> 4 - Very Good </option>
                                <option value="5"> 5 - Excellent </option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="mt-2" controlId='comment'>
                                <FormLabel>Comment</FormLabel>
                                <FormControl
                                as='textarea'
                                row='3'
                                value={comment}
                                required
                                onChange={e => setComment(e.target.value)}
                                ></FormControl>
                            </FormGroup>
                            <Button className="mt-2" type='submit' variant="primary">Submit</Button>

                        </Form>) : ( <Message  variant="dark">Please <Link to='/login'>Sign in</Link>to write a review </Message> )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    </motion.div>
          }
    
                                </>
  )
}

export default Book