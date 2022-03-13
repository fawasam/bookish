import axios from "axios"
import Swal from 'sweetalert2'
import{
    BOOK_LIST_FAIL,
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_DETAILS_FAIL,
    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DELETE_FAIL,
    BOOK_DELETE_REQUEST,
    BOOK_DELETE_SUCCESS,
    BOOK_CREATE_FAIL,
    BOOK_CREATE_REQUEST,
    BOOK_CREATE_SUCCESS,
    BOOK_UPDATE_FAIL,
    BOOK_UPDATE_REQUEST,
    BOOK_UPDATE_SUCCESS,
    BOOK_CREATE_REVIEW_FAIL,
    BOOK_CREATE_REVIEW_REQUEST,
    BOOK_CREATE_REVIEW_SUCCESS,
    BOOK_SAVE_FAIL,
    BOOK_SAVE_REQUEST,
    BOOK_SAVE_SUCCESS,
    LIST_SAVED_BOOK_FAIL,
    LIST_SAVED_BOOK_REQUEST,
    LIST_SAVED_BOOK_SUCCESS,
    BOOK_SAVE_DELETE_FAIL,
    BOOK_SAVE_DELETE_REQUEST,
    BOOK_SAVE_DELETE_SUCCESS

} from "../constants/constants.js"

//CREATE BOOK

export const createBooks=(genre,title,author,description,language,image,url)=>async(dispatch,getState) =>{

      try {
        dispatch({type:BOOK_CREATE_REQUEST})
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const user =userInfo._id;
        const {data} = await axios.post(`/api/books` ,{user,genre,title,author,description,language,image,url}, config)
        Swal.fire({
          title: 'Book Create',
         text: 'Successfully',
         icon: 'success',
        showConfirmButton: false,
       }) 
        dispatch({
            type:BOOK_CREATE_SUCCESS,
            payload:data
        })

    } catch (error) {
            dispatch({ 
            type:BOOK_CREATE_FAIL, 
            payload :error.message
        })
    }  
}

//SAVE BOOK
export const saveBooks =(id)=>async(dispatch ,getState)=>{

    try {
         dispatch({
            type:BOOK_SAVE_REQUEST
        })
        
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/books/savebooks/${id}` ,{},config)
        Swal.fire({
          title: 'Book saved',
         text: 'Successfully',
         icon: 'success',
        showConfirmButton: false,
       }) 
        dispatch({
            type:BOOK_SAVE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:BOOK_SAVE_FAIL,
            payload:"Invalid credentials"
        })
        
    }

}

export  const listSavedBooks =(id) =>async(dispatch,getState)=>{
   try {
         dispatch({
            type:LIST_SAVED_BOOK_REQUEST
        })
        
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/books/savebooks/${id}` ,config) 
        dispatch({
            type:LIST_SAVED_BOOK_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:LIST_SAVED_BOOK_FAIL,
            payload:"Invalid credentials"
        })
        
    }   
}


export  const deleteSaveBook =(id) =>async(dispatch,getState)=>{
   try {
         dispatch({
            type:BOOK_SAVE_DELETE_REQUEST
        })
        
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/books/savebooks/${id}`,config) 
        dispatch({
            type:BOOK_SAVE_DELETE_SUCCESS,
           
        })
        Swal.fire({
        title: 'Saved Book removed ',
        text: 'Successfully',
         icon: 'success',
        showConfirmButton: false,
       }) 

    } catch (error) {
        dispatch({
            type:BOOK_SAVE_DELETE_FAIL,
            payload:"Invalid credentials"
        })
        
    }   
}

export const listBooks = () => async (dispatch , getState)=>{
    try {
        dispatch({type:BOOK_LIST_REQUEST})

          //GET USER INFO AS TOKEN
        // const {userLogin:{userInfo}} = getState()

        // const config ={
        //     headers:{ 
        //          Authorization : `Bearer ${userInfo.token}`
        //     }
        // }
        const  {data} = await axios.get(`/api/books` ,)
        
        dispatch({
            type:BOOK_LIST_SUCCESS, 
            payload :data
        })
    } catch (error) {
        dispatch({ 
            type:BOOK_LIST_FAIL , 
            pyload :error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }

}

//delete books

export const deletebook = (id) => async (dispatch,getState )=>{
    try {
        dispatch({type:BOOK_DELETE_REQUEST})
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/books/${id}` , config)
        
        dispatch({
            type:BOOK_DELETE_SUCCESS,
        })

    } catch (error) {
            dispatch({ 
            type:BOOK_DELETE_FAIL, 
            payload :error.message
        })
    }

}

//create  review

export const createBookReview = (bookId,review) => async (dispatch,getState )=>{
    try {
        dispatch({type:BOOK_CREATE_REVIEW_REQUEST})
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                  'Content-Type':'application/json', 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/books/${bookId}/review`,review, config)
        
        dispatch({
            type:BOOK_CREATE_REVIEW_SUCCESS,
            payload:data
        })

    } catch (error) {
            dispatch({ 
            type:BOOK_CREATE_REVIEW_FAIL, 
            payload :error.message
        })
    }

}


//book details
export const listBooksDetails = (id) => async (dispatch )=>{
    try {
        dispatch({type:BOOK_DETAILS_REQUEST})
        const  {data} = await axios.get(`/api/books/${id}`)
        
        dispatch({
            type:BOOK_DETAILS_SUCCESS, 
            payload :data
        })
    } catch (error) {
        dispatch({ 
            type:BOOK_DETAILS_FAIL , 
            pyload :error.response && error.response.data.message ? 
            error.response.data.message : error.message
        })
    }

}

//update book

export const updateBooks = (book) => async (dispatch,getState )=>{
    try {
        dispatch({type:BOOK_UPDATE_REQUEST})
 
        //GET USER INFO AS TOKEN
        const {userLogin:{userInfo}} = getState()

        const config ={
            headers:{ 
                  'Content-Type':'application/json', 
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/books/${book._id}` ,book, config)
        
        dispatch({
            type:BOOK_UPDATE_SUCCESS,
            payload:data
        })

    } catch (error) {
            dispatch({ 
            type:BOOK_UPDATE_FAIL, 
            payload :error.message
        })
    }

}