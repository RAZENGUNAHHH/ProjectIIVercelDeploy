"use client"

import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
    CaretSortIcon,
    PlusIcon,
    DownloadIcon
} from "@radix-ui/react-icons"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Model_form from './Model_form'
import DialogEdit from './DialogEdit'
import { Course_table, colorStatus, member_type } from '../../../../type/type'
import Box_graph from './Box_graph'
import Bar_chart_compo from './Bar_chart_compo'
import TableCourse from '@/app/components/TableCourse'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
type prop = {
    all_course_admin: Course_table[]
}

export default function MainAdmin({ all_course_admin }: prop) {
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
    const documentRef = useRef(null)

    const handlePDF = useCallback(async()=>{
        const template = documentRef.current!
        try{

            const canvas = await html2canvas(template)
            const pdf = new jsPDF({
                    orientation : 'landscape',
                    unit : 'px',
                    format : 'a4'
            })

            const width = pdf.internal.pageSize.getWidth()
            const height = (canvas.height * width) / canvas.width
            pdf.addImage(canvas , 'PNG' , 0 , 0 , width , height);
            pdf.save('eoeo.pdf')

        }catch(err){

        }

    },[documentRef])

    const data = useMemo(() => {
        // add enrolNumber
        const finalData = all_course_admin.slice()
        finalData.forEach((data: Course_table) => {
            data.enrolNumber = `${data.members.length}/${data.limited}`
        })
        return finalData
    }, [all_course_admin])

    const columns: ColumnDef<Course_table>[] = [
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
            accessorKey: "enrolNumber",
            header: ({ column }) => {
                return headersButtonSorted(column, 'จำนวนผู้ลงทะเบียน')
            },
            cell: ({ row }) => {
                return (
                    <div>{row.getValue("enrolNumber")}</div>
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
            accessorKey: "status",
            header: ({ column }) => {
                return headersButtonSorted(column, 'สถานะ')
            },
            cell: ({ row }) => {
                const value: string = row.getValue("status")
                return (
                    <div
                        className={`w-[110px] text-center p-1 py-1 rounded-xl text-white`}
                        style={{ backgroundColor: `${colorStatus[value]}` }}>
                        {value}
                    </div>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const course = row.original
                return (
                    <DialogEdit rowData={course} />
                )
            },
        },
    ]
    
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
    return (
        <section   className='grow-[2] bg-[#F1F1F1]' ref={documentRef}>
            <Model_form isOpenModel={isOpenModel} setIsOpenModel={setIsOpenModel} />
            <div className='bg-white h-[10vh] shadow-md py-4 px-12 items-center flex'>
                <p className='text-3xl p-0 font-bold text-[#011F4B]'>Dashboard</p>
            </div>
            <div className="w-full px-5">
                <div className='mx-5 mt-5 grid justify-items-end mb-0'>
                    <Button className='bg-[#0249B1]' onClick={() => setIsOpenModel(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" />เพิ่มค่าย
                    </Button>
                    
                </div>
                <TableCourse  data={data} columns={columns} />
            </div>
            <div className=' max-h-[200vh] w-full px-10  flex justify-between mb-5'>
                <Box_graph className='w-[45vw] '>
                    <Bar_chart_compo />
                </Box_graph>
                <Box_graph className='w-[45vw] '>
                    <Bar_chart_compo />
                </Box_graph>
            </div>
        </section>
    )
}
