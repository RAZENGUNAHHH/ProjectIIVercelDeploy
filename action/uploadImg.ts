'use server'

import { revalidatePath } from "next/cache"
import connectDB from "../config/database"
import courserModel from "../model/courseModel"
import { Course_type } from "../type/type"

export async function upload_file(formData : Course_type){
    try{
                 const connect = await connectDB()
                 if(!connect) return { status : 404 , msg : 'Disconnected...'}
                 const new_Course = new courserModel(formData)
                 const res =  await new_Course.save()
                 if(res){
                        revalidatePath('/admin')
                        return { status : 200 , msg : 'Susssessfully'}
                 }else{
                        return { status  : 400 , msg : 'Error'}
                 }
    }catch(err){
            console.log(err)
            return { status  : 400 , msg : 'Error system'}
    }
}

