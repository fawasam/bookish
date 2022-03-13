import mongoose from 'mongoose'
import bookScheme from "../models/bookModel.js"

const userSchema =mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    savedBooks:{
        type:[mongoose.Schema.Types.ObjectId]
    },

    Mybook:{
        type:mongoose.Schema.Types.Array,
        ref:'Book'
    }
    
},{
    timestamps:true
})

const User =mongoose.model('User' ,userSchema)
export default User