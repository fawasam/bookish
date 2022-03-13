import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {LinkContainer} from 'react-router-bootstrap'
import {Row ,Col, Button ,Form, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import {getUserDetails ,UpdateuserDetails,listMyBook } from "../redux/actions/userAction.js"
import Loader from '../components/Loader'
import Message from '../components/Message.jsx'
import {useNavigate} from "react-router-dom"

const Profile = () => {

    const [name ,setName] =useState('')
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const [confirmPassword ,setConfirmPassword] =useState('')
    const [message ,setMessage] =useState(null)

    const dispatch =useDispatch()
    const navigate=useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {loading , error , user } =userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } =userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success } =userUpdateProfile

    const bookListMy = useSelector(state => state.bookListMy)
    const {loading:loadingbooks , error:errorbooks , books } =bookListMy

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user.name){
                dispatch (getUserDetails('profile'))
                dispatch(listMyBook(userInfo._id))
            }else{
                setName(user.name)
                setEmail(user.email)
            }

        }
    },[userInfo , dispatch ,user , navigate ])


    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else{
            //dipatch udpader profile 
            dispatch(UpdateuserDetails({id:user._id , name  ,email , password}))
        }
    }
    return (
        <Row className='mt-5'>
            <Col md={4}>
  <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile updated</Message>}
            {loading && <Loader />}
           <Form onSubmit={submitHandler}>

               <FormGroup controlId='name'>
                   <FormLabel>Username</FormLabel>
                   <FormControl 
                   type='name' 
                   placeholder='Enter name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='email'>
                   <FormLabel>Email Address</FormLabel>
                   <FormControl 
                   type='email' 
                   placeholder='Enter email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='password'>
                   <FormLabel>Password</FormLabel>
                   <FormControl 
                   type='password' 
                   placeholder='Enter password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='confirmPassword'>
                   <FormLabel>Confirm Password</FormLabel>
                   <FormControl 
                   type='password' 
                   placeholder='Confirm password'
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>
               <Button  className='mt-3' type='submit'variant='primary'>
                   Update
               </Button>
           </Form>
            </Col>
            <Col md={8}>
                <h2>My Books</h2>        
                {loadingbooks ? <Loader /> : errorbooks ? <Message variant="danger">{errorbooks}</Message> :(
                    <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                            <tr>
                                <th>TITLE</th>
                                <th>DATE</th>
                                <th>AUTHOR</th>
                                <th>GENRE</th>
                                <th>LAUNGUAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                                <tbody>
                                    {books.map(book => (
                                        <tr key={book._id}>
                                            <td>{book.title}</td>
                                            <td>{book.createdAt.substring(0,10)}</td>
                                            <td>{book.author}</td>
                                            <td>{book.genre}</td>
                                            <td>{book.language}</td>
                                            <td>
                                                <LinkContainer to={`/books/${book._id}`}>
                                                    <Button variant='light'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                    </Table>
                )}
            </Col>
        </Row>

    )
}

export default Profile
