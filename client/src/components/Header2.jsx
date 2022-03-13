import React, { useState } from 'react'
import  {NavLink ,useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from "react-redux"
import { logout } from '../redux/actions/userAction'
import "./Header.css"
const Header = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin

    const logoutHandler =()=>{
      dispatch(logout())
      navigate("/")
    }

  const [click, setClick] =useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
     <div>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
     
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Bookish
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/books"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/addbook"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Addbook
              </NavLink>
            </li>
            {userInfo ? <>
            <li className="nav-item">
              <NavLink
                exact
                to={`/savedBooks/${userInfo._id}`}
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                SavedBooks
              </NavLink>
            </li>
            
            </>:
            <>
            </>}
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Contact
              </NavLink>
            </li>
            {userInfo ? (
                  <>
               {
                 <>
                  <li className="nav-item nav-hvr">
                      <NavLink
                        exact
                        to="/user"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        {userInfo.name}
                      </NavLink>

                      <div className="nav-bar">
                        <li className="nav-item">
                          <NavLink
                            exact
                            to="/addbook"
                            activeClassName="active"
                            className="nav-links"
                            onClick={click ? handleClick : null}
                          >
                            Profile
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            exact
                            to="/addbook"
                            activeClassName="active"
                            className="nav-links"
                            onClick={click ? handleClick : null}
                          >
                            Add book
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            exact
                            to="/admin/userList"
                            activeClassName="active"
                            className="nav-links"
                            onClick={click ? handleClick : null}
                          >
                            Users
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            exact
                            to="/admin/bookList"
                            activeClassName="active"
                            className="nav-links"
                            onClick={click ? handleClick : null}
                          >
                            Books
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <a
                            exact
                            href='/'
                            // to="/"
                            activeClassName="active"
                            className="nav-links"
                            // onClick={click ? handleClick : null}
                            onClick={logoutHandler}
                          >
                            Logout
                          </a>
                        </li>
                      </div>

                    </li></> 
              }
                </>
            ):(
                <><li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Login
                  </NavLink>
                </li><li className="nav-item">
                    <NavLink
                      exact
                      style={{ color: '#fff' }}
                      to="/signup"
                      activeClassName="active"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      Signup
                    </NavLink>
                  </li></>
            )}
    
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>

  )
}

export default Header