import { Schema , model , models} from 'mongoose'


const userSchema = new Schema({
        email : {
            type : String,
            required  : true,
            unique  : true,
        },
        password : { 
            type : String,
            required : true,
        },
        student_id : {
            type : Number,  
            required : true
        },
        ac_year : {
            type : Number,
            required : true,
        },
        role: {
            type :String,
            default : 'user'
        },
        name : {   
            type : String,
            require : true
        },
        sur_n : { 
            type : String,
            require : true
        }

} ,{ timestamps : true})

const userModel = models.user || model('user' , userSchema)

export default userModel