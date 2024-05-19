'use client'
import React, { useEffect, useState } from 'react'
import { SelectMap } from './components/Select_map'
import Image from 'next/image'

type Props = {}

export default function Map_main({}: Props) {
  const [isOpen  , setIsOpen] = useState<boolean[]>(Array(6).fill(false))

  useEffect(()=>{
    const handleClick = (e : any) => {
      const parentElement = e.target.closest('.parent');
      const open_select = e.target.closest('.opp')
      if(!parentElement && !open_select){
        setIsOpen(Array(6).fill(false))
      }
    };
  
       window.addEventListener('click', handleClick);
       return () => {
        window.removeEventListener('click', handleClick);
      };
  },[isOpen])

  
  return (
    <div className='grow-[2] bg-[#F1F1F1]'>
         {/* map bar */}
         <div className='w-full h-[8vh] bg-[#FFFFFF] shadow-md flex items-center'>
                <h3 className='w-[10vw] text-center'> แผนที่มหาวิทยาลัย </h3>
                <ul className='flex w-full items-center gap-x-10'>
                  { isOpen.map((isOpenState : boolean , index)=>(
                    <SelectMap setIsOpen={setIsOpen} key={'open' + index}  index={index} isOpenState={isOpenState}/>
                  ))
                  }
                </ul>
         </div>
         <div className='my-10 ml-7 flex gap-x-5 justify-center'>
            <Image src={'/sil_map.jpg'} alt='location' width={1800} height={900}/>
            
         </div>
    </div>
  )
}