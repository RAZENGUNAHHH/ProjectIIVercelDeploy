'use client'
import React, { useCallback, useMemo } from 'react'
import { user_enrol, user_profile_type } from '../../../type/type'
import {
    ColumnDef
} from "@tanstack/react-table"
import { Button } from '@/components/ui/button'
import TableCourse from '../components/TableCourse'
import { CaretSortIcon, DownloadIcon } from '@radix-ui/react-icons'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

const headersButtonSorted = (column: any, name: string) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {name}
            <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
    )
}
type Props = {
    user_profile: user_profile_type
    course_enrol: { course: user_enrol[] }[]
}

export default function MainUserProfile({ user_profile, course_enrol }: Props) {
    const data = useMemo(() => {
        return course_enrol
    }, [course_enrol])

    const columns: ColumnDef<user_enrol>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return headersButtonSorted(column, 'ชื่อค่าย')
            },
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return headersButtonSorted(column, 'ประเภทค่าย')
            },
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "instructor",
            header: ({ column }) => {
                return headersButtonSorted(column, 'ชื่อผู้สอน')
            },
            cell: ({ row }) => <div>{row.getValue("instructor")}</div>,
        },
        {
            accessorKey: "st_date",
            header: ({ column }) => {
                return headersButtonSorted(column, 'วันที่เริ่มค่าย')
            },
            cell: ({ row }) => {
                const value: string = new Date(row.getValue("st_date")).toISOString().substring(0, 10)
                return (
                    <div>{value}</div>
                )
            },
        },
        {
            accessorKey: "en_date",
            header: ({ column }) => {
                return headersButtonSorted(column, 'วันที่สิ้นสุดค่าย')
            },
            cell: ({ row }) => {
                const value: string = new Date(row.getValue("en_date")).toISOString().substring(0, 10)
                return (
                    <div>{value}</div>
                )
            },
        },
        {
            accessorKey: "detail",
            header: ({ column }) => {
                return headersButtonSorted(column, 'รายละเอียด')
            },
            cell: ({ row }) => <div>{row.getValue("detail")}</div>,
        },
        {
            accessorKey: "certificate",
            header: ({ column }) => {
                return headersButtonSorted(column, 'สถานะ')
            },
            cell: ({ row }) => <div className={`${row.getValue("certificate") === true ? 'text-[#41B06E]' : 'text-[#DC143C]'}`}>{row.getValue("certificate") === true ? 'ผ่าน': 'ไม่ผ่าน'}</div>,
        },
        {
            accessorKey: "printPdf",
            header: () => <div>ใบ Certificate</div>,
            cell: ({ row }) => <div> <Button type='button' className='bg-[#0249B1]' disabled={!row.getValue("certificate")} onClick={() => generatePDF(user_profile.name , user_profile.sur_n)}><DownloadIcon className="mr-2 h-4 w-4"/>certificate.pdf</Button> </div>,
        },
    ]

    const generatePDF = useCallback(async (name: string , s_name : string) => {
        let divElement = document.createElement('div');
        try {
            divElement.className = 'flex flex-col w-[50vw] bg-slate-300 h-[60vh] items-center justify-center gap-y-4';
    
            const imageElement = document.createElement('img');
            imageElement.src = '/picture/Logo.svg';
            imageElement.alt = 'logo';
            imageElement.width = 150;
            imageElement.height = 150;
    
            const h2Element = document.createElement('h2');
            h2Element.textContent = 'ภาควิชาวิศกรรมไฟฟ้า';
            h2Element.className = 'text-[24px]';
    
            const h5Element1 = document.createElement('h5');
            h5Element1.textContent = 'คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยศิลปากร';
            h5Element1.className = 'text-[24px]';
    
            const h5Element2 = document.createElement('h5');
            h5Element2.textContent = 'ประกาศนียบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า';
            h5Element2.className = 'text-[24px]';
    
            const pElement = document.createElement('p');
            pElement.textContent = name + " " + s_name;
            pElement.className = 'text-[24px]';
    
            const pDateElement = document.createElement('p');
            pDateElement.textContent = 'ณ วันที่ 28 กันยายน 2566';
            pDateElement.className = 'text-[24px]';
    
            divElement.appendChild(imageElement);
            divElement.appendChild(h2Element);
            divElement.appendChild(h5Element1);
            divElement.appendChild(h5Element2);
            divElement.appendChild(pElement);
            divElement.appendChild(pDateElement);
    
            // เพิ่ม element ลงใน DOM ตามที่ต้องการ
            document.body.appendChild(divElement);
    
            const canvas = await html2canvas(divElement)
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: 'a4'
            })
    
            const width = pdf.internal.pageSize.getWidth()
            const height = pdf.internal.pageSize.getHeight()
            pdf.addImage(canvas, 'PNG', 0, 0, width, height);
            pdf.save('certificate.pdf')
        } catch (err) {
    
        }finally{
            document.body.removeChild(divElement);
        }
    }, [])

    return (
        <section className='grow-[2] bg-[#F1F1F1]'>
            <div className='w-full items-center py-4 px-12 bg-white shadow-md'>
                <p className='text-5xl p-0 font-bold text-[#011F4B]'>User <span className='text-2xl'> Information</span></p>
            </div>
            <div className='bg-white rounded-md m-5 p-4 shadow-md grid grid-cols-2 text-lg'>
                <div className='p-3 flex flex-col gap-4'>
                    <p><span className='font-bold'>รหัสนักศึกษา: </span>{user_profile.student_id}</p>
                    <p><span className='font-bold'>ชื่อ: </span>{user_profile.name}  {user_profile.sur_n} </p>
                </div>
                <div className='p-3 flex flex-col gap-4'>
                    <p><span className='font-bold'>อีเมล: </span>{user_profile.email}</p>
                    <p><span className='font-bold'>ชั้นปีที่: </span>{user_profile.ac_y}</p>
                </div>
            </div>
            <p className='text-xl font-bold mx-10 py-3 text-[#011F4B]'>ค่ายที่ลงทะเบียน</p>
            <TableCourse data={data} columns={columns}/>
        </section>
    )
}
