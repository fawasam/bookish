import express from'express'
import dotenv from'dotenv'
import connectDB from "./config/db.js"
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
//routes
import userRoute from "./routes/userRoutes.js"
import bookRoutes from './routes/bookRoutes.js'
import uploadRoute from "./routes/uploadRoute.js"
import {notFound ,errorHandler} from './middleware/errorMiddleware.js'


//app
const app =express()
const __dirname = path.resolve();

//configurations
dotenv.config()
connectDB()
app.use(cors())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(morgan('dev'))
app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/books" ,bookRoutes)
app.use("/api/upload",uploadRoute)


//make uploads folder static
app.use('/uploads' , express.static(path.join(__dirname , '/uploads')))


if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname , "/client/build", 'index.html'))
    })
}
else{
    app.get('/' , (req,res)=>{
        res.send('API is Running')
    })
}


app.use(notFound)
app.use(errorHandler)



//port
const PORT =process.env.PORT || 5000
app.listen(PORT , console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))