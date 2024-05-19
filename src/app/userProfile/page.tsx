import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MainUserProfile from './MainUserProfile'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { user_profile_type } from '../../../type/type'
import { user_enrol } from '../../../action/fetchdb'

export default async function page() {
    const session : any = await getServerSession(authOptions)
    const user_profile : user_profile_type = session?.user
    const course_enrol : any = await user_enrol(user_profile.id)
    return (
        <section className='flex flex-col h-screen'>
            <Navbar user_profile={user_profile} />
            <MainUserProfile user_profile={user_profile} course_enrol={course_enrol}/>
            <Footer />
        </section>
    )
}
