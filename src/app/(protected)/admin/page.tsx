import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainAdmin from './MainAdmin'
import { fetch_all_course } from '../../../../action/fetchdb'
import { user_profile_type } from '../../../../type/type'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function page() {
    const all_course_admin: any = await fetch_all_course('admin')
    const session : any = await getServerSession(authOptions)
    const user_profile : user_profile_type = session?.user
   if(user_profile.role != 'admin'){
    return <section className='w-full h-screen flex justify-center items-center text-[5rem]'> No no no  you not admin</section>
   }
   console.log(all_course_admin)
    return (
        <section className='flex flex-col h-screen'>
            <Navbar user_profile={user_profile} />
            <MainAdmin all_course_admin={all_course_admin} />
            <Footer />
        </section>
    )
}
