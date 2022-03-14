import React ,{useEffect} from 'react'
import {useNavigate  } from 'react-router-dom'
import {Container,Navbar,Nav,NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch , useSelector} from "react-redux"
import { logout } from '../redux/actions/userAction'

const Header = () => {

    const navigate = useNavigate();
    const dispatch =useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin


    useEffect(()=>{
       if(userInfo){
           navigate("/")
       }
   },[ userInfo ])

    const logoutHandler =()=>{
      dispatch(logout())
      navigate("/")

    }

    return (
<>

<Navbar bg="light" expand="lg"   collapseOnSelect>
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand>Bookish</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to="/" >
        <Nav.Link > 
          Home
        </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/books" >
        <Nav.Link > 
          Books
        </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contact" >
        <Nav.Link > 
          Contact
        </Nav.Link>
        </LinkContainer>
        {userInfo &&
        <LinkContainer to="/addbook" >
        <Nav.Link > 
          Addbook
        </Nav.Link>
        </LinkContainer>
        }
        
        {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/savedBooks/${userInfo._id}`}>
              <NavDropdown.Item>SavedBooks</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
            <a href="/" onClick={logoutHandler}>Logout</a>  
            </NavDropdown.Item>
          </NavDropdown>
        ):(
          <>
        <LinkContainer to="/login">
        <Nav.Link >  
             Sign In
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/signup">
        <Nav.Link >  
             Register
          </Nav.Link>
        </LinkContainer>
          </>
         )}
         {userInfo && userInfo.isAdmin && (

           <NavDropdown title='Admin' id='admin'>
            <LinkContainer to='/admin/userList'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/bookList'>
              <NavDropdown.Item>Books</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>  
         )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        </>
    )
}
export default Header
