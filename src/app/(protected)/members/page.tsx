import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { user_profile_type } from '../../../../type/type'
import MainMembers from './MainMembers'
import { fetch_members } from '../../../../action/fetchdb'

export default async function page({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const session : any = await getServerSession(authOptions)
    const user_profile : user_profile_type = session?.user
    const id = searchParams?.id
    const fetch_data : any = await fetch_members(id as string) 
    const name_course  = fetch_data?.name_corse
    
    return (
        <section className='flex flex-col h-screen'>
            <Navbar user_profile={user_profile} />
            <MainMembers data={fetch_data.members} name_course={name_course}/>
            <Footer />
        </section>
    )
}
