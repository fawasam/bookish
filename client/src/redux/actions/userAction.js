import axios from 'axios'
import Swal from 'sweetalert2'

import { 
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    MYBOOK_LIST_FAIL,
    MYBOOK_LIST_REQUEST,
    MYBOOK_LIST_SUCCESS,
    MYBOOK_LIST_RESET

} from "../constants/constants"

//toast bar
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



//register

export const register = (name ,email ,password) => async (dispatch) =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/users/register" , 
        {name,email ,password},config)

        //if user register success then dispatch both register and login
       Swal.fire({
         title: 'Registration completed',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data,
        })

       dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))

    } catch (error) {
            dispatch({ 
            type:USER_REGISTER_FAIL , 
            payload :'Invalid credentials'
        })
    }
}

//login action

export const login = (email ,password) => async (dispatch) =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/users/login" , {email ,password},config)
        Toast.fire({
           icon: 'success',
           title: 'log in successfully'
        })
          
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))

    } catch (error) {
            dispatch({ 
            type:USER_LOGIN_FAIL , 
            payload :'Invalid credentials'
        })
    }
}

//logout action

export const logout =()=>(dispatch) =>{
        Toast.fire({
           icon: 'success',
           title: 'You have been logged out successfully'
        })   
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    // dispatch({type:MYBOOK_LIST_RESET})
    dispatch({type:USER_LIST_RESET})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

}

//list user actios
export const listUsers = () => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_LIST_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users`,config)
  
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:USER_LIST_FAIL , 
            payload :error.message
        })
    }
}
//get user details
export const getUserDetails = (id) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_DETAILS_REQUEST
        })
 
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:USER_DETAILS_FAIL , 
            payload :error.message
        })
    }
}


//delete user
export const deleteUser = (id) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_DELETE_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`,config)
              dispatch({type:USER_DELETE_SUCCESS})

    } catch (error) {
            dispatch({ 
            type:USER_DELETE_FAIL , 
            payload :error.message
        })
    }
}


//update user

export const updateUser = (user) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_UPDATE_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/${user._id}`,user ,config)
        Swal.fire({
         title: 'User Update',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          }) 
              dispatch({type:USER_UPDATE_SUCCESS})
              dispatch({type:USER_DETAILS_SUCCESS  , payload:data})

    } catch (error) {
            dispatch({ 
            type:USER_UPDATE_FAIL , 
            payload :error.message
        })
    }
}

export const UpdateuserDetails = (user) => async (dispatch , getState ) =>{
    try {

        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`,user ,config)

       Swal.fire({
         title: 'Profile Updated',
         text: 'Successfully',
         icon: 'success',
         showConfirmButton: false,
          })  
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:USER_UPDATE_PROFILE_FAIL , 
            payload :error.message
        })
    }
}

//list mybooks
export const listMyBook = () => async (dispatch , getState ) =>{
    try {
        dispatch({
            type:MYBOOK_LIST_REQUEST
        })
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/Mybooks/${userInfo._id}` , config)
        
        dispatch({
            type:MYBOOK_LIST_SUCCESS,
            payload:data,
        })

    } catch (error) {
            dispatch({ 
            type:MYBOOK_LIST_FAIL , 
            payload :error.message
        })
    }
}
