import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
type Props = {}

export default function Main_aboutUs({}: Props) {
  return (
    <section className='grow'>
        <nav className='bg-white h-[10vh] shadow-md py-4 px-12 items-center flex'>
                <p className='text-3xl p-0 font-bold text-[#011F4B]'>About us</p>
        </nav>
        <div className='w-full h-[90%] flex '>
             <div className='w-[50%] flex justify-center items-center  '>
                <ul className='flex flex-col gap-y-10'>
                    <li className='flex items-center justify-start gap-x-10'> <Image src={'/picture/Group.svg'} width={50} height={50} alt='pic'/> lertpanyawuttik_s@silpakorn.edu </li>
                    <li className='flex items-center justify-start gap-x-10'> <Image src={'/picture/phone.svg'} width={50} height={50} alt='pic'/> 083-017-0614</li>
                    <li className='flex items-center justify-start gap-x-10'><Image src={'/picture/tabler_social.svg'} width={50} height={50} alt='pic'/></li>
                </ul>
             </div>
             <div className='w-[50%] flex items-center justify-center flex-col'>
                <ul className='flex flex-col w-full gap-y-7'>
                     <p className='text-[36px] text-wrap w-[25vw]'> สวัสดี! เรายินดีที่จะรับฟังจากคุณ ส่งความคิดของคุณถึงเรา</p>
                     <label htmlFor="email">
                        <input  className='w-[50%] border rounded-lg outline-none px-4 py-2' type="text"  id='email' placeholder='Email'/>
                    
                    </label>
                    <label htmlFor="subject">
                        <input  className='w-[50%] border rounded-lg outline-none px-4 py-2' type="text" id='subject' placeholder='Subject' />
                    
                    </label>
                    <label htmlFor="de" className='h-[20%]'>
                        <textarea className='w-[50%]  border rounded-lg outline-none px-4 py-2'  cols={20} rows={5} id='de' placeholder='Write something...'/>
                    </label>
                </ul>
                <Button type='button' className='self-start flex items-center gap-x-5 bg-[#005b96] mt-2'>  Submit Message </Button>
            </div>
        </div>
        
        </section>
  )
}