'use server'

import { revalidatePath } from "next/cache"
import connectDB from "../config/database"
import courseModel from "../model/courseModel"
import enrolModel from "../model/enrolModel"
import mongoose from "mongoose"
import { Course_type } from "../type/type"
import userModel from "../model/userModel"





export async function fetch_all_course(category : 'engineer' | 'genius' | 'admin') {
  try {
    const connect = await connectDB()
    const search = category == 'admin' ? {} : {'category' : category};
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const today_date = new Date()
    const all_course = await courseModel.aggregate([
      {
        $match : search
      },
      {
        $lookup : {
          from : 'enrols',
          localField : '_id',
          foreignField : 'id_course',
          as : 'members'

        }
      },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      { $lt: [today_date, "$st_enrol"] },
                      { $lt: [today_date, "$en_enrol"] }
                    ]
                  }, then: "ลงทะเบียนเร็วๆนี้"
                },
                {
                  case: {
                    $and: [
                      { $gte: [today_date, "$st_enrol"] },
                      { $lt: [today_date, "$en_enrol"] }
                    ]
                  }, then: "ช่วงลงทะเบียน"
                },
                {
                  case: {
                    $and: [
                      { $gte: [today_date, "$en_enrol"] },
                      { $lt: [today_date, "$st_date"] }
                    ]
                  }, then: "จะเริ่มในอีก...."
                },
                {
                  case: {
                    $and: [
                      { $gte: [today_date, "$st_date"] },
                      { $lte: [today_date, "$en_date"] }
                    ]

                  }, then: "กำลังดำเนินการ"
                },

              ],
              default: "เสร็จสิ้นแล้ว"
            }
          }
        }
      }
    ]);
    return all_course

  } catch (err) {
    return { status: 500, msg: err }
  }
}







export async function enrolCourse(id_course: string, id_user: string) {
  try {
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const find_user = await userModel.findById(id_user)
    if(!find_user){
        return { status : 400 , msg : 'User not exit in system'}
    }
    const new_enrol = new enrolModel({
      id_user: id_user,
      id_course: id_course,
      name : find_user.name
    })
    const res = await new_enrol.save()

    if (res) {
      revalidatePath('/')
      revalidatePath('/geniusCamp')
      return { status: 200, msg: 'Susssessfully' }
    } else {
      return { status: 400, msg: 'Error' }
    }

  } catch (err) {
    return { status: 400, msg: 'error system' }
  }
}



export async function Delete_course(id_course: string) {
  try {
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const find_course = await courseModel.deleteOne({ _id : id_course})
    if(find_course.acknowledged){
      try{
        const result = await enrolModel.deleteMany({id_course : id_course})
        if(result.acknowledged){
          revalidatePath('/admin')
          return { status: 200, msg: 'Susssessfully' }
        }else{
          return { status: 400, msg: 'delete enrol not Susssessfully' }
        }
      }catch(err){
        return { status: 400, msg: 'delete enrol error' }
      }
    }else{
      return { status : 400 , msg : 'data not delete'}
    }
  } catch (err) {
    console.log(err)
    return { status: 400, msg: 'error system' }
  }
}





export async function edit_course( id_course : string , data_edit: Course_type) {
  try {
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const modify = await courseModel.updateOne({ _id: id_course }, { $set: data_edit });

    if(modify){
      revalidatePath('/admin')
      return { status: 200, msg: 'Susssessfully' }
    }else{
      return { status : 400 , msg : 'Fail to update'}
    }
  } catch (err) {
    return { status: 400, msg: 'error' }
  }
}



export async function user_enrol(id_user : string) {
  try{
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const objectId = new mongoose.Types.ObjectId(id_user)
    const user_profile = await enrolModel.aggregate([
      {
          $match: { 'id_user': objectId }
      },
      {
          $lookup: {
              from: 'courses',
              localField: 'id_course',
              foreignField: '_id',
              as: 'course'
          }
      },
      {
          $unwind: '$course'
      },
      {
          $project: {
              _id : 0,
              instructor : '$course.instructor',
              st_date :'$course.st_date',
              en_date :'$course.en_date',
              detail :'$course.detail',
              category :'$course.category' ,
              certificate  :'$certificate' ,
              name : "$course.name"
          }
      },

  ]);
    return user_profile || []
  
  


  }catch(err){
      console.log(err)
      return  {status : 400 , msg : 'Error'}
  }
  
}




export async function fetch_home() {
  try{
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const course = await query_home()
    return course

  }catch(err){
      console.log(err)
      return  {status : 400 , msg : 'Error'}
  }
  
}

async function query_home(){
  const today_date = new Date()
    try{
      const all_course = await courseModel.aggregate([
        {
          $lookup: {
            from: 'enrols',
            localField: '_id',
            foreignField: 'id_course',
            as: 'members'
          }
        },
        {
          $addFields: {
            status: {
              $switch: {
                branches: [
                  { case: { $and: [{ $lt: [today_date, "$st_enrol"] }, { $lt: [today_date, "$en_enrol"] }] }, then: "ลงทะเบียนเร็วๆนี้" },
                  { case: { $and: [{ $gte: [today_date, "$st_enrol"] }, { $lt: [today_date, "$en_enrol"] }] }, then: "ช่วงลงทะเบียน" },
                  { case: { $and: [{ $gte: [today_date, "$en_enrol"] }, { $lt: [today_date, "$st_date"] }] }, then: "จะเริ่มในอีก...." },
                  { case: { $and: [{ $gte: [today_date, "$st_date"] }, { $lte: [today_date, "$en_date"] }] }, then: "กำลังดำเนินการ" }
                ],
                default: "เสร็จสิ้นแล้ว"
              }
            }
          }
        },
        {
          $group: {
            _id: "$category",
            courses: { $push: "$$ROOT" } 
          }
        }
      ]);

      return all_course
      

    }catch(err){
        console.log(err)
        return  {status : 400 , msg : 'Error'}

    }
}



export async function fetch_members(id : string) {
  try {
    const connect = await connectDB()
    const id_course = new  mongoose.Types.ObjectId(id)
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const [membersInfo] = await courseModel.aggregate([
      {
        $match: { _id: id_course }
      },
      {
        $lookup: {
          from: 'enrols',
          localField: '_id',
          foreignField: 'id_course',
          as: 'members'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'members.id_user',
          foreignField: '_id',
          as: 'info_user'
        }
      },
      
  
      
    ]);
    const member =  membersInfo.members.map((data : any , index : number)=>{
      return { 
        _id : data._id,
        certificate : data.certificate ?  'ผ่าน' : 'ไม่ผ่าน',
        name : membersInfo.info_user[index].name + " " +  membersInfo.info_user[index].sur_n,
        student_id : membersInfo.info_user[index].student_id,
        ac_year : membersInfo.info_user[index].ac_year,
      }
    })
    return { name_corse : membersInfo.name , members : member}

  } catch (err) {
    return { status: 500, msg: err }
  }
}



export async function set_pass(id_enrol : string[]){
  try{
    const connect = await connectDB()
    if (!connect) return { status: 404, msg: 'Disconnected...' }
    const condition = { _id: { $in: id_enrol } };
    const res = await enrolModel.updateMany(condition , { certificate : true})
    if(res.acknowledged){
      revalidatePath('/members')
      return { status: 200, msg: 'Susssessfully' }
    }else{
      return { status: 500, msg: 'Can not update!' }
    }
  }catch(err){
      console.log(err)
     return  { status: 500, msg: 'error system' }
       
  }
}



export async function delete_in_course(id_enrol : string[]){
    try{
      const connect = await connectDB()
      if (!connect) return { status: 404, msg: 'Disconnected...' }
      const condition = { _id: { $in: id_enrol } };
      const res = await enrolModel.deleteMany(condition)
      if(res.acknowledged){
        revalidatePath('/members')
        return { status: 200, msg: 'Susssessfully' }
      }else{
        return { status: 500, msg: 'Can not delete!' }
      }
    }catch(err){
        console.log(err)
       return  { status: 500, msg: 'error system' }
         
    }
}