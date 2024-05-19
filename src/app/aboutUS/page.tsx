import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Main_aboutUs from './Main_aboutUs'
import { getServerSession } from 'next-auth'
import { user_profile_type } from '../../../type/type'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function page() {
  const session : any = await getServerSession(authOptions)
  const user_profile : user_profile_type = session?.user
  return (
    <section className='flex flex-col h-screen'>
      <Navbar user_profile={user_profile}/>
      <Main_aboutUs/>
      <Footer/>
    </section>
  )
}
