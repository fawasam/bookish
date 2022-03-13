

import React, { useEffect  } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { LinkContainer} from 'react-router-bootstrap'
import { Button,Table  , Row ,Col } from 'react-bootstrap'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
// import { PRODUCT_CREATE_RESET } from '../redux/constants/constants.js'
import { listBooks, createBooks ,deletebook} from "../redux/actions/bookAction.js"
import {useNavigate} from "react-router-dom"


const ProductList = ({history , match}) => {

    const dispatch =useDispatch()
    const navigate =useNavigate()

    const bookList = useSelector (state =>state.bookList)
    const {loading , error , books} =bookList
    console.log(books);

    const bookDelete = useSelector (state =>state.bookDelete)
    const {success:successDelete } =bookDelete

    const userLogin = useSelector (state =>state.userLogin)
    const {userInfo} = userLogin

    const bookCreate = useSelector (state =>state.bookCreate)
    const {success:successCreate , book:createdBooks} =bookCreate


    useEffect(()=>{

        // dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin ){
        navigate("/login")
        }
        if(successCreate) {
            // history.push(`/admin/product/${createdBooks._id}/edit`)
        }else{
            dispatch(listBooks())
        }

    },[dispatch , history  ,userInfo  ,successDelete , successCreate , createdBooks])

    const deleteHandler =(id) =>{

    Swal.fire({
        title: 'Do you want to remove this Product ?',
        showDenyButton: true,
        confirmButtonText: 'Remove',
        denyButtonText: `cancel`,
        }).then((result) => {

         if (result.isConfirmed) {
          Swal.fire('Product Removed!', '', 'success')

            dispatch(deletebook(id))

         } else if (result.isDenied) {
    Swal.fire('Cancelled', '', 'info')
       }
        })
    }
    
    const createProductHandler =() =>{
        dispatch(createBooks())
    }

    return (
        <div className=' mt-5'>
        <Row className='align-items-center'>
            <Col>
            <h1>books</h1>
            </Col>
            <Col className='text-end'>
                <LinkContainer to={`/addbook`}>
                <Button className='my-3'
                onClick={createProductHandler}
                > <i className="fas fa-plus"></i> Create books
                </Button>
                </LinkContainer>
            </Col>
        </Row>
        {loading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm mt-3'>
                <thead>
                    <tr>
                        <th>TITLE</th>
                        <th>AUTHOR</th>
                        <th>GENRE</th>
                        <th>LANGUAGE</th>
                        
                        <th></th>
                    </tr>                   
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.user}</td>
                            
                            <td>
                                <LinkContainer to={`/book/${book._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button  
                                variant='danger' 
                                className='btn-sm' 
                                onClick={()=> deleteHandler(book._id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody> 
            </Table>
        )}
            
        </div>
    )
}

export default ProductList
