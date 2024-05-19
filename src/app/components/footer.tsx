import React from 'react'

import Image from 'next/image'
import Logo from '../../../public/picture/Logo.svg'
import {
    EnvelopeClosedIcon,
    MobileIcon
} from '@radix-ui/react-icons'


export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-[#011F4B] to-[#0249B1]">
            <div className='flex justify-center p-4'>
                <span className="text-sm text-white">Copyright © 2023 <a href="" className="hover:underline">SU</a>.
                </span>
            </div>
            <div className=" mx-auto p-4 md:flex md:items-center text-white md:gap-6 md:mx-4 font-light md:pb-6">
                <Image
                    src={Logo}
                    alt="Picture logo"
                    style={{ width: '5%', height: '5%' }}
                />
                <p>เว็บไซต์สำหรับลงทะเบียนโครงการ <br />และค่ายอัจฉริยะสำหรับนักศึกษา ECS</p>
                <div>
                    <p>ติดต่อเรา</p>
                    <div className='flex flex-row items-center gap-2'>
                        <EnvelopeClosedIcon/>
                        <p>083-017-0614</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <MobileIcon/>
                        <p>lertpanyawuttik_s@silpakorn.edu</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
