'use client'
import React, { ChangeEvent, useState } from 'react'
import { 
    MagnifyingGlassIcon
} from '@radix-ui/react-icons'
import { Course_table } from '../../../type/type'
import CardCamp from '../components/CardCamp'


type prop = {
    allCourse: Course_table[],
    role : string,
    id_u : string
}

export default function MainEngiCamp({allCourse,role , id_u }: prop) {
    const [searchItem, setSearchItem] = useState('')
    const [filteredCourse, setFilteredCourse] = useState<Course_table[]>(allCourse)

    function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = allCourse.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCourse(filteredItems);
    }
   

    return (
        <section className='grow-[2] bg-[#F1F1F1]'>
            <div className='w-full flex flex-wrap items-center justify-between mx-auto py-4 px-12 bg-white shadow-md'>
                <p className='text-5xl p-0 font-bold text-[#011F4B]'>ESC <span className='text-2xl'>Engineer Camp</span></p>
                <div className='flex flex-row items-center p-2'>
                    <MagnifyingGlassIcon className='text-[#D9D9D9] mr-2' />
                    <input
                        onChange={handleInputChange}
                        type="text"
                        value={searchItem}
                        className='border-b outline-none'
                        placeholder='ค้นหาค่าย Engineer' />
                </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 p-8'>
                {filteredCourse?.length > 0 ?
                    allCourse.map((course, index) => (
                        <CardCamp role={role} id_user={id_u} key={'card' + index} index={index} course={course} />
                    ))
                    : <p> ไม่มีข้อมูล</p>
                }
            </div>
        </section>
    )
}