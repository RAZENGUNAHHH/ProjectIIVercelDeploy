import React, { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Course_table, Course_type } from '../../../../type/type'
import { UploadButton } from '@/utils/uploadthing'
import toast from 'react-hot-toast'
import { Delete_course, edit_course } from '../../../../action/fetchdb'
import { useRouter } from 'next/navigation'

type Props = {
    rowData: Course_table
}

export default function DialogEdit({ rowData }: Props) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    // const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

    const [status_upload, setStatus_upload] = useState<string>('')
    const [img_url, setImg_url] = useState<string>(rowData.img_src)

    const router = useRouter()

    const deleteInfo = useCallback(async (id_course: string) => {
        const res = await Delete_course(id_course)
        if (res.status == 200) {
            toast.success('Successfully')
            return
        } else {
            toast.error(res.msg)
        }

    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Course_table>()
    const onSubmit: SubmitHandler<Course_table> = async (data) => {
        const new_data = { ...data, img_src: img_url }
        const res = await edit_course(rowData._id, new_data as Course_type)
        if (res.status == 200) {
            toast.success('Successfully')
        } else {
            toast.error(res?.msg)
        }
    }

    return (
        <section>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>แก้ไข</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>ลบ</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDetailDialogOpen(true)}>รายละเอียดทั้งหมด</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/members?id=${rowData._id}`)}>รายชื่อทั้งหมด</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={isEditDialogOpen ?
                    setIsEditDialogOpen : setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>คุณแน่ใจมั้ยที่จะลบ?</DialogTitle>
                        <DialogDescription className='pt-4'>
                            คุณต้องการลบค่ายชื่อ &quot{rowData.name}&quot
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">ยกเลิก</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className='bg-[#0249B1]' onClick={() => deleteInfo(rowData._id)}>ลบ</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isEditDialogOpen}
                onOpenChange={isEditDialogOpen ?
                    setIsEditDialogOpen : setIsDeleteDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>แก้ไขข้อมูลค่าย {`"${rowData.name}"`}</DialogTitle>
                            <DialogDescription>
                                <span className="flex flex-col gap-4 p-4 text-black font-semibold">
                                    <span>
                                        ชื่อค่าย:
                                        <input {...register("name")} defaultValue={rowData.name} className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        วันที่เริ่ม:
                                        <input {...register("st_date")} defaultValue={rowData.st_date.toISOString().substring(0, 10)} type='date' className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        วันที่สิ้นสุด:
                                        <input {...register("en_date")} defaultValue={rowData.en_date.toISOString().substring(0, 10)} type='date' className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        ชื่อผู้สอน:
                                        <input {...register("instructor")} defaultValue={rowData.instructor} className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        วันที่เริ่มลงทะเบียน:
                                        <input {...register("st_enrol")} defaultValue={rowData.st_enrol.toISOString().substring(0, 10)} type='date' className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        วันที่สิ้นสุดลงลงทะเบียน:
                                        <input {...register("en_enrol")} defaultValue={rowData.en_enrol.toISOString().substring(0, 10)} type='date' className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        รายละเอียด:
                                        <input {...register("detail")} defaultValue={rowData.detail} className="ml-4 col-span-3 font-normal" />
                                    </span>
                                    <span>
                                        รูปภาพ:
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={async (res) => {
                                                // Do something with the response
                                                setStatus_upload('Upload successfully')
                                                setImg_url(res[0].url)
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                toast(`ERROR! ${error.message}`);
                                            }}
                                        />
                                        {status_upload ?
                                            <span suppressHydrationWarning={false} className='text-green-600 flex justify-center'>{status_upload}</span>
                                            : null

                                        }
                                    </span>
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant="outline">ยกเลิก</Button>
                            </DialogClose>
                            <Button type='submit' className='bg-[#0249B1]'>แก้ไข</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
            {/* <Dialog
                open={isMemberDialogOpen}
                onOpenChange={isMemberDialogOpen ?
                    setIsMemberDialogOpen : setIsDeleteDialogOpen}>
                <DialogContent className='max-h-[50%] overflow-scroll'>
                    <DialogHeader>
                        <DialogTitle>รายขื่อผู้ลงทะเบียนค่าย {`"${rowData.name}"`}</DialogTitle>
                        <DialogDescription className='grid gap-4 py-4 text-black'>
                            {rowData.members.length === 0 ?
                                'ยังไม่มีคนลงทะเบียน' :
                                rowData.members.map((member: member_type, index: number) => (
                                    <span key={index}>{index + 1}. {member.name}</span>
                                ))
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className='bg-[#0249B1]'>ปิด</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
            <Dialog
                open={isDetailDialogOpen}
                onOpenChange={isDetailDialogOpen ?
                    setIsDetailDialogOpen : setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>รายละเอียดค่าย {`"${rowData.name}"`}</DialogTitle>
                        <DialogDescription>
                            <span className="grid gap-4 p-4 text-black">
                                <span><span className='font-semibold'>ชื่อค่าย:</span> {rowData.name}</span>
                                <span><span className='font-semibold'>ประเภทค่าย:</span> {rowData.category}</span>
                                <span><span className='font-semibold'>วันที่เริ่ม:</span> {rowData.st_date.toISOString().substring(0, 10)}</span>
                                <span><span className='font-semibold'>วันที่สิ้นสุด:</span> {rowData.en_date.toISOString().substring(0, 10)}</span>
                                <span><span className='font-semibold'>ชื่อผู้สอน:</span> {rowData.instructor}</span>
                                <span><span className='font-semibold'>วันที่เริ่มลงทะเบียน:</span> {rowData.st_enrol.toISOString().substring(0, 10)}</span>
                                <span><span className='font-semibold'>วันที่สิ้นสุดลงลงทะเบียน:</span> {rowData.en_enrol.toISOString().substring(0, 10)}</span>
                                <span><span className='font-semibold'>จำนวนผู้ลงทะเบียน:</span> {rowData.enrolNumber}/{rowData.limited}</span>
                                <span><span className='font-semibold'>รายละเอียด:</span> {rowData.detail}</span>
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
        </section>
    )
}
