'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import Logo from '../../../public/picture/Logo.svg'
import { user_profile_type } from '../../../type/type'

export default function Navbar({user_profile} : {user_profile : user_profile_type}) {
    const { status} = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const role = useMemo(() => {
        if(user_profile.role=='user'){
                return true
        }else{
                return false
        }

    }, [user_profile.role])

    return (
        <nav className='bg-gradient-to-r from-[#011F4B] to-[#0249B1]'>
            <div className="w-full flex flex-wrap items-center justify-between px-10">
                <div className='flex flex-wrap p-3'>
                    <div>
                        <Image
                            src={Logo}
                            alt="Picture logo"
                            style={{ width: '85%', height: '85%' }}
                        />
                    </div>
                    {/* reponsive bar */}
                    {/* <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                    <div className="hidden w-full md:block md:w-auto p-3">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                            <li className={cn({'bg-white w-fit h-fit rounded-xl text-[#005b96]' : pathname == '/'})}>
                                <Link href="/" className={cn("block py-2 px-3 text-white  md:bg-transparent hover:text-[#0249B1]" , { 'text-[#005b96]'  : pathname == '/' })}>หน้าหลัก</Link>
                            </li>
                            <li className={cn({'bg-white w-fit h-fit rounded-xl text-[#005b96]' : pathname == '/map'})}>
                                <Link href="/map" className={cn("block py-2 px-3 text-white  md:bg-transparent hover:text-[#0249B1]" , { 'text-[#005b96]'  : pathname == '/map' })}>แผนที่</Link>
                            </li>
                            <li className={cn({'bg-white w-fit h-fit rounded-xl text-[#005b96]' : pathname == '/aboutUS'})}>
                                <Link href="/aboutUS" className={cn("block py-2 px-3 text-white  md:bg-transparent hover:text-[#0249B1]" , { 'text-[#005b96]'  : pathname == '/aboutUS' })}>เกี่ยวกับเรา</Link>
                            </li>
                            <li className={cn({'bg-white w-fit h-fit rounded-xl text-[#005b96]' : pathname == '/geniusCamp'})}>
                                <Link href="/geniusCamp" className={cn("block py-2 px-3 text-white  md:bg-transparent hover:text-[#0249B1]" , { 'text-[#005b96]'  : pathname == '/geniusCamp' })}>ค่ายอัจฉริยะ</Link>
                            </li>
                            <li className={cn({'bg-white w-fit h-fit rounded-xl text-[#005b96]' : pathname == '/engiCamp'})}>
                                <Link href="/engiCamp" className={cn("block py-2 px-3 text-white  md:bg-transparent hover:text-[#0249B1]" , { 'text-[#005b96]'  : pathname == '/engiCamp' })}>EngiCamp</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* baby-angel-light-skin-tone-svgrepo-com.svg */}
                <div className='flex flex-row gap-3'>
                    {
                        status == 'unauthenticated' ?
                            null
                            :
                            role ?
                                <Link href="/userProfile" className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <span className="self-center font-semibold text-white">{user_profile.name}  {user_profile.sur_n}</span>
                                    <Image alt='student' width={50} height={50} className='w-10 h-10 bg-white rounded-[50%]' src={'/picture/adult-light-skin-tone-svgrepo-com.svg'} />
                                </Link>
                                :
                                <Link href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <span className="self-center font-semibold text-white">Admin</span>
                                    <Image alt='student' width={50} height={50} className='w-10 h-10 bg-white rounded-[50%]' src={'/picture/baby-angel-light-skin-tone-svgrepo-com.svg'} />
                                </Link>
                    }
                    {status == 'unauthenticated' ?
                        <Button onClick={() => router.push('/signIn')} type='button' className='bg-white hover:text-white text-[#005b96]'> เข้าสู่ระบบ </Button>
                        :
                        <Button onClick={() => signOut()} type='button' className='bg-white hover:text-white text-[#005b96]'> ออกจากระบบ </Button>

                    }
                </div>
            </div>
        </nav>
    )
}
