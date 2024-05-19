import { NextRequest, NextResponse } from "next/server";
import userModel from "../../../../model/userModel";
import bcrypt from "bcrypt";
export async function POST(req : Request){
    try {
        const {email , password , stu_id , ac_year } = await req.json();
        
        if (!email || !password || !stu_id || !ac_year) {
            return NextResponse.json({
                status: 400,
                error: "Missing required fields"
            });
        }
        const hashedPassword  = await bcrypt.hash(password,10)
        await userModel.create({ email : email , password : hashedPassword , student_id :stu_id , ac_year : ac_year})        
        return NextResponse.json({
            status: 200,
            message: "Success"
        });
    } catch (err) {
        // จัดการข้อผิดพลาดที่เกิดขึ้น
        console.error(err);
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error"
        });
    }
}
