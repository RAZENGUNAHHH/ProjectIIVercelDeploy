import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Main from './Main'
import { fetch_all_course } from '../../../action/fetchdb'
import { getServerSession } from 'next-auth'
import { user_profile_type } from '../../../type/type'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function page() {
    const allCourse : any = await fetch_all_course('genius')
    const session : any = await getServerSession(authOptions)
    const user_profile : user_profile_type = session?.user

    return (
        <section className='flex flex-col h-screen'>
            <Navbar user_profile={user_profile} />
            <Main allCourse={allCourse} role={user_profile.role} id_u={user_profile.id}/>
            <Footer />
        </section>
    )
}
