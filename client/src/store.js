import { createStore ,combineReducers ,applyMiddleware} from 'redux'
import  thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'

import { 
    userRegisterReducer,
    userLoginReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    bookListMyReducer


} from './redux/reducers/userReducer.js'

import {

 bookCreateReducer,
 bookSaveReducer,
 listSavedBookReducer,
 deleterSavedBookReducer,
 bookListReducer,
 booksDeleteReducer,
 bookReviewCreateReducer,
 bookDetailsReducer,
 bookUpdateReducer
 
 
 

} from "./redux/reducers/bookReducer.js"

const reducer=combineReducers({
   userRegister:userRegisterReducer,
   userLogin:userLoginReducer,
   userList:userListReducer,
   userUpdate:userUpdateReducer,
   userDetails:userDetailsReducer,
   userDelete:userDeleteReducer,
   bookCreate:bookCreateReducer,
   bookSave:bookSaveReducer,
   listSavedBook:listSavedBookReducer,
   deleteSavedBook:deleterSavedBookReducer,
   bookList:bookListReducer,
   bookDelete:booksDeleteReducer,
   bookReview:bookReviewCreateReducer,
   bookDetails:bookDetailsReducer,
   userUpdateProfile:userUpdateProfileReducer,
   bookListMy:bookListMyReducer,
   bookUpdate:bookUpdateReducer
})


//local storage
const  userInfoFromStorage =localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState ={
userLogin : { userInfo : userInfoFromStorage}, 
}


const middleware =[thunk]
const store =createStore(
    reducer,
    initialState , 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store