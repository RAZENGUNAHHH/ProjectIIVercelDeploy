import React from 'react'
import Map_main from './Map_main'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getServerSession } from 'next-auth'
import { user_profile_type } from '../../../type/type'
import { authOptions } from '../api/auth/[...nextauth]/route'

type Props = {}

export default async function Map({}: Props) {
  const session : any = await getServerSession(authOptions)
  const user_profile : user_profile_type = session?.user
  
  return (
    <section className='flex flex-col h-screen'>
        <Navbar user_profile={user_profile}/>
        <Map_main/>
       <Footer/>
    </section>
  )
}