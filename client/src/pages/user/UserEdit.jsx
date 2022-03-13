import React, { useEffect, useState  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {Link,useNavigate ,useParams  } from 'react-router-dom'
import { Button ,Form, FormGroup, FormLabel, FormControl, FormCheck, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer.jsx'
import Message from '../../components/Message.jsx'
import Loader from '../../components/Loader'
import { USER_UPDATE_RESET } from '../../redux/constants/constants.js'
import { getUserDetails,updateUser  } from "../../redux/actions/userAction.js"

const UserEdit = () => {

    const dispatch =useDispatch()
    const navigate =useNavigate()
    const {id:userId} =useParams()
    const [name ,setName] =useState('')
    const [email ,setEmail] =useState('')
    const [isAdmin ,setIsAdmin] =useState(false)

    console.log(name,email,isAdmin);
    const userDetails = useSelector(state => state.userDetails)
    const { error , user ,loading } =userDetails
    console.log(user);

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate ,success:successUpdate } =userUpdate

    useEffect(()=>{

        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate("/admin/userList")
        }else{           
            if(!user.name  || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
      
    },[user , dispatch , userId  ,successUpdate ])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateUser({
            _id:userId,
            name,
            email,
            isAdmin
        }))
        console.log( name ,isAdmin)
    
    }

    return (
        <>
        <Link to ='/admin/userList' className='btn btn-light my-3'>Go Back</Link>
        <Row className='p-5'>
            <h1>Edit User</h1>
            {/* {loadingUpdate && <Loader /> } */}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(

            <Form onSubmit={submitHandler}>
               <FormGroup controlId='name' className='mt-2'>
                   <FormLabel>Username</FormLabel>
                   <FormControl 
                   type='name' 
                   placeholder='Enter name'
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='email' className='mt-2'>
                   <FormLabel>Email Address</FormLabel>
                   <FormControl 
                   type='email' 
                   placeholder='Enter email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   >
                   </FormControl>
               </FormGroup>

               <FormGroup controlId='IsAdmin' className='mt-4'>
                   <FormCheck
                   type='checkbox' 
                   label='IsAdmin'
                   checked={isAdmin}
                   onChange={(e)=>setIsAdmin(e.target.checked)}
                   >
                   </FormCheck>
               </FormGroup>
               
               <Button  className='mt-3' type='submit'variant='primary'>
                   Update
               </Button>
           </Form>

            )}
          
        </Row>
        </>
    )
}

export default UserEdit
