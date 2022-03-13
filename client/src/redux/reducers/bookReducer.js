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
    BOOK_UPDATE_RESET,
    BOOK_CREATE_REVIEW_FAIL,
    BOOK_CREATE_REVIEW_REQUEST,
    BOOK_CREATE_REVIEW_SUCCESS,
    BOOK_CREATE_REVIEW_RESET,
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

//create book

export const bookCreateReducer =(state ={} , action)=>{

    switch (action.type) {
        case BOOK_CREATE_REQUEST:
            return { loading :true }
        case BOOK_CREATE_SUCCESS:
            return { loading :false , success :true , book:action.payload}
        case BOOK_CREATE_FAIL:
            return { loading :false , error:action.payload}
        // case BOOK_CREATE_RESET:
        //     return {}
        default:
            return state
            
    }
}

//save book

export const bookSaveReducer =(state ={} , action)=>{

    switch (action.type) {
        case BOOK_SAVE_REQUEST:
            return { loading :true }
        case BOOK_SAVE_SUCCESS:
            return { loading :false , success :true , book:action.payload}
        case BOOK_SAVE_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}

export const listSavedBookReducer =(state ={} , action)=>{

    switch (action.type) {
        case LIST_SAVED_BOOK_REQUEST:
            return { loading :true }
        case LIST_SAVED_BOOK_SUCCESS:
            return { loading :false , success :true , book:action.payload}
        case LIST_SAVED_BOOK_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}

export const deleterSavedBookReducer =(state ={} , action)=>{

    switch (action.type) {
        case BOOK_SAVE_DELETE_REQUEST:
            return { loading :true }
        case BOOK_SAVE_DELETE_SUCCESS:
            return { loading :false , success :true}
        case BOOK_SAVE_DELETE_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}

//LIST ALL BOOKS

export const bookListReducer =(state ={books:[]} , action)=>{

    switch (action.type) {
        case BOOK_LIST_REQUEST:
            return { loading :true , books :[]}
        case BOOK_LIST_SUCCESS:
            return { loading :false , books :action.payload}
        case BOOK_LIST_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}

//DELTE A BOOK
export const booksDeleteReducer =(state ={} , action)=>{

    switch (action.type) {
        case BOOK_DELETE_REQUEST:
            return { loading :true }
        case BOOK_DELETE_SUCCESS:
            return { loading :false , success :true}
        case BOOK_DELETE_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}


//add review
export const bookReviewCreateReducer =(state ={} , action)=>{

    switch (action.type) {
        case BOOK_CREATE_REVIEW_REQUEST:
            return { loading :true }
        case BOOK_CREATE_REVIEW_SUCCESS:
            return { loading :false , success :true}
        case BOOK_CREATE_REVIEW_FAIL:
            return { loading :false , error:action.payload}
        case BOOK_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
            
    }
}


//BOOK DETALIS

export const bookDetailsReducer =(state ={book:{reviews : []}} , action)=>{

    switch (action.type) {
        case BOOK_DETAILS_REQUEST:
            return { loading :true , ...state}
        case BOOK_DETAILS_SUCCESS:
            return { loading :false , book :action.payload}
        case BOOK_DETAILS_FAIL:
            return { loading :false , error:action.payload}
        default:
            return state
            
    }
}


//BOOK UPDATE
export const bookUpdateReducer =(state ={book:{}} , action)=>{

    switch (action.type) {
        case BOOK_UPDATE_REQUEST:
            return { loading :true }
        case BOOK_UPDATE_SUCCESS:
            return { loading :false , success :true , book:action.payload}
        case BOOK_UPDATE_FAIL:
            return { loading :false , error:action.payload}
        case BOOK_UPDATE_RESET:
            return {book:{}}
        default:
            return state
            
    }
}
