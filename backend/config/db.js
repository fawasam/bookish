import mongoose from 'mongoose'
import dotenv from'dotenv'
dotenv.config()


const connectDB = async ()=>{

    try {
        const conn =await mongoose.connect('mongodb+srv://fawasam:Fawas1234@mern.lscun.mongodb.net/Bookreview?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true ,bufferCommands:false })
            console.log('MOngo connected');
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB