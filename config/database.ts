import mongoose from "mongoose";

const connectDB = async ()=>{
        try{
                await mongoose.connect(String(process.env.MONGODB_URI))
                console.log('Connected....')
                return true
        }catch(err){
                console.log(err)
                throw new Error('Disconnected...')
        }   
}

export default connectDB