'use server'
import connectDB from "../config/database"
import userModel from "../model/userModel"
import bcrypt from "bcrypt";

export async function registration(data: any) {
    try {
       const connect =  await connectDB();
       if(!connect) {
         throw new Error('DB disconnect..')
       }
        const { email, pwd, std_id, ac_y , name , sur_n } = data;

        if (!email || !pwd || !std_id || !ac_y || !name || !sur_n) {
            return {
                statusCode: 400,
                msg: 'Valid data',
            };
        }
        const user  = await userModel.findOne({email : email})
        if(user){
            return {
                statusCode : 400,
                msg : 'Duplicate email'
            }
        }
        const hashedPassword = await bcrypt.hash(pwd, 10);
        await userModel.create({ email: email, password: hashedPassword, student_id: std_id, ac_year: ac_y , name : name , sur_n : sur_n });
        return {
            statusCode: 200,
            msg: 'Registration successfully',
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 400,
            msg: err as string,
        };
    }
}
