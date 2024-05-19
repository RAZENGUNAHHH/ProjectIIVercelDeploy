import React from 'react'

import { fetch_all_course, fetch_home } from '../../../action/fetchdb'
import Main from './main'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { user_profile_type } from '../../../type/type'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'


export default async function Page() {
    const allCourse : any = await fetch_home()
    const session : any = await getServerSession(authOptions)
    const user_profile : user_profile_type = session?.user
    const geniusCamp = allCourse?.find((data : any)=> data?._id == 'genius')
    const engineerCamp = allCourse?.find((data : any)=> data?._id == 'engineer')

    return (
        <section className='flex flex-col h-screen'>
            <Navbar user_profile={user_profile}/>
            <Main role={user_profile.role} engineerCamp={engineerCamp?.courses || []} geniusCamp={geniusCamp?.courses || []} />
            <Footer/>
        </section>

    )
}