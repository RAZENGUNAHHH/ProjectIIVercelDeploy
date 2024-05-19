
import React from 'react'
import Image from 'next/image'
import loginPic from '../../../public/loginPic.svg'
import Inner from './Inner'


export default function Page() {


    return (
        <section className='w-screen flex justify-center items-center h-screen'>
            <div className='fixed w-screen flex h-screen justify-center items-center z-[-1] right-32'>
                <div className='block w-[60vw] bg-black h-[80vh] bg_signIn'>
                </div>
            </div>
            <section className='w-[60vw] h-[70vh] flex justify-center  border bg-[#FFFFFF] rounded-[14px] shadow-md px-[2rem]'>
                <div className=' flex justify-center'>
                    <Image
                        src={loginPic}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                    />
                </div>
                <Inner/>
            
            </section>

        </section>
    )
}