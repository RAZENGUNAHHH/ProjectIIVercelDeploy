import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Course_table, colorStatus } from '../../../type/type'
import { enrolCourse } from '../../../action/fetchdb'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

type Props = {
    index: number,
    course: Course_table
    id_user: string
    role : string,
}


export default function CardCamp({role , id_user, index, course }: Props) {
    const [isEnrol , setIsEnrol] = useState<boolean>(false)
    
    useEffect(()=>{
        const res = course.members.some((mem)=> ( mem.id_user == id_user))
        if(res){
                setIsEnrol(true)
        }

    },[course.members, id_user])

    const handle_enrol = useCallback(async () => {
        const res = await enrolCourse(course._id, id_user)
        if (res.status = 200) {
            toast.success('Susssessfully')
        } else {
            toast.error(res.msg)
        }

    }, [course._id, id_user])
    return (
        <section>
            <Card key={index + 'card'} className='shadow-md rounded-[12px] min-h-fit border-white'>
                <CardContent className="flex flex-col p-0 h-fit">
                    <div className='w-full bg-[#D9D9D9] rounded-t-[12px]'>
                        <Image className='rounded-t-[12px] h-[200px]'
                            src={course.img_src}
                            width={500}
                            height={200}
                            alt='pic'
                            style={{ objectFit: 'contain' }} />
                    </div>
                    <div className='py-1 px-6 h-[200px]'>
                        <p className='line-clamp-2 mt-3 font-bold text-lg'>{course.name}</p>
                        <div
                            className={`mb-3 w-fit p-1 px-2 rounded-xl text-white`}
                            style={{ backgroundColor: `${colorStatus[course.status]}` }}>
                            {course.status}
                        </div>
                        <p><span className='font-semibold'>ผู้สอน: </span>{course.instructor}</p>
                        <p><span className='font-semibold'>วันที่ลงทะเบียน: </span>{course.st_enrol.toISOString().substring(0, 10)} ถึง {course.en_enrol.toISOString().substring(0, 10)}</p>
                        <p><span className='font-semibold'>วันที่เริ่มค่าย: </span>{course.st_date.toISOString().substring(0, 10)} ถึง {course.en_date.toISOString().substring(0, 10)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Dialog>
                        <DialogTrigger>
                            <p className='bg-white border rounded-md p-3 text-black hover:bg-[#F6F6F6]'>รายละเอียดทั้งหมด</p>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>รายละเอียดค่าย {`"${course.name}"`}</DialogTitle>
                                <DialogDescription>
                                    <span className="grid gap-4 p-4 text-black">
                                        <span><span className='font-semibold'>ชื่อค่าย:</span> {course.name}</span>
                                        <span><span className='font-semibold'>วันที่เริ่ม:</span> {course.st_date.toISOString().substring(0, 10)}</span>
                                        <span><span className='font-semibold'>วันที่สิ้นสุด:</span> {course.en_date.toISOString().substring(0, 10)}</span>
                                        <span><span className='font-semibold'>ชื่อผู้สอน:</span> {course.instructor}</span>
                                        <span><span className='font-semibold'>วันที่เริ่มลงทะเบียน:</span> {course.st_enrol.toISOString().substring(0, 10)}</span>
                                        <span><span className='font-semibold'>วันที่สิ้นสุดลงลงทะเบียน:</span> {course.en_enrol.toISOString().substring(0, 10)}</span>
                                        <span><span className='font-semibold'>รายละเอียด:</span> {course.detail}</span>
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className='bg-[#0249B1]'>ปิด</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                        { role == 'admin' ?  null:
                                            <Dialog>
                                                <DialogTrigger disabled={isEnrol || course.status != 'ช่วงลงทะเบียน'}>
                                                    <p className={cn('bg-[#0249B1] rounded-md p-3 text-white hover:text-white hover:bg-black' , { 'cursor-not-allowed hover:bg-[#0249B1] opacity-[40%]': isEnrol || course.status != 'ช่วงลงทะเบียน'})}>{isEnrol ? 'ลงทะเบียนแล้ว': 'ลงทะเบียน'}</p>
                                                </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader className='mt-2'>
                                                    <DialogTitle>คุณต้องการลงทะเบียนค่าย {`"${course.name}"`}</DialogTitle>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={handle_enrol} className='bg-[#0249B1]'>ยืนยันลงทะเบียน</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog> 

                        }
                </CardFooter>
            </Card>
        </section>
    )
}
