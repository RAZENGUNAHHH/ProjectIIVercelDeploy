'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { member_type } from '../../../../type/type'
import { CaretSortIcon, CheckIcon, DownloadIcon, MagnifyingGlassIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { delete_in_course, set_pass } from '../../../../action/fetchdb'
import toast from 'react-hot-toast'
// import { generatePDF } from '@/app/components/misc'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import ExportTable from '@/app/components/ExportTable'

export default function MainMembers({ data, name_course }: { data: member_type[], name_course: string }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const columnsExTable = [
        { name: 'รหัสนักศึกษา', key: 'student_id' },
        { name: 'ชื่อ', key: 'name' },
        { name: 'ชั้นปี', key: 'ac_year' },
        { name: 'สถานะ', key: 'certificate' },

    ]

    const columns: ColumnDef<member_type>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox className='ml-4'
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "student_id",
            header: ({ column }) => {
                return headersButtonSorted(column, 'รหัสนักศึกษา')
            },
            cell: ({ row }) => <div>{row.getValue("student_id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return headersButtonSorted(column, 'ชื่อ')
            },
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "ac_year",
            header: ({ column }) => {
                return headersButtonSorted(column, 'ชั้นปี')
            },
            cell: ({ row }) => <div>{row.getValue("ac_year")}</div>,
        },
        {
            accessorKey: "certificate",
            header: ({ column }) => {
                return headersButtonSorted(column, 'สถานะ')
            },
            cell: ({ row }) => <div className={`${row.getValue("certificate") === 'ผ่าน' ? 'text-[#41B06E]' : 'text-[#DC143C]'}`}>{row.getValue("certificate")}</div>,
        },
        {
            accessorKey: "printPdf",
            header: () => <div>ใบ Certificate</div>,
            cell: ({ row }) => <div> <Button type='button' className='bg-[#0249B1]' disabled={!row.getValue("certificate")} onClick={() => generatePDF(row.getValue('name'))}><DownloadIcon className="mr-2 h-4 w-4" />certificate.pdf</Button> </div>,
        }
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

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const selectedUserRow = () => {
        const selectedIndex: string[] = Object.keys(rowSelection)
        const seletedUser = selectedIndex.map((index) => {
            const numIndex = parseInt(index)
            return data[numIndex]._id
        })
        return seletedUser
    }

    async function setNewStatus() {
        // change status from not pass to pass
        const selectedUser = selectedUserRow()
        const res = await set_pass(selectedUser)
        if (res.status == 200) {
            toast.success(res.msg)
        } else {
            toast.error(res.msg)
        }
    }

    async function deleteUser() {
        // delete user
        const selectedUser = selectedUserRow()
        const res = await delete_in_course(selectedUser)
        if (res.status == 200) {

            toast.success(res.msg)
        } else {
            toast.error(res.msg)
        }

    }


    const generatePDF = useCallback(async (name: string) => {
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

            const h5Element3 = document.createElement('h5');
            h5Element3.textContent = 'ค่าย  ' + name_course;
            h5Element3.className = 'text-[24px]';

            const pElement = document.createElement('p');
            pElement.textContent = name;
            pElement.className = 'text-[24px]';

            const pDateElement = document.createElement('p');
            pDateElement.textContent = 'ณ วันที่ 28 กันยายน 2566';
            pDateElement.className = 'text-[24px]';

            divElement.appendChild(imageElement);
            divElement.appendChild(h2Element);
            divElement.appendChild(h5Element1);
            divElement.appendChild(h5Element2);
            divElement.appendChild(h5Element3);
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

        } finally {
            document.body.removeChild(divElement);
        }
    }, [name_course])

    const generateTable = useCallback(async () => {
        const domNode = document.createElement('div');
        const root = createRoot(domNode);
        try {
            await root.render(<ExportTable data={data} columns={columnsExTable} name_course={name_course} />);
            document.body.appendChild(domNode);
            const table = document.getElementById('tableExport');
            // สร้าง canvas ที่มีขนาดเหมาะสมกับข้อมูลในตาราง
            const canvas = await html2canvas(table!);

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            });

            const scaleFactor = 1; // ปรับขนาดตามต้องการ
            const width = pdf.internal.pageSize.getWidth() * scaleFactor ;
            const height = pdf.internal.pageSize.getHeight() * scaleFactor - 570;
            pdf.addImage(canvas, 'PNG', 0, 0, width, height);
            pdf.save('Table.pdf');

        } catch (err) {
            console.log(err)
        } finally {
            root.unmount()

        }
    }, [columnsExTable, data, name_course])

    return (
        <section className='grow-[2] bg-[#F1F1F1]' id='section_pdf'>
            <div className='bg-white h-[10vh] shadow-md py-4 px-12 items-center flex justify-between'>
                <p className='text-3xl p-0 font-bold text-[#011F4B]'>รายชื่อนักศึกษา ค่าย {"'" + name_course + "'"}</p>
                <Link href='/admin' className='border-b-2 border-[#011F4B] text-[#011F4B] hover:text-[#0249B1] hover:border-[#0249B1]'>กลับไปยังหน้า admin</Link>
            </div>
            <div className="m-5">
                <div className="flex items-center pb-4 justify-between">
                    <div className='flex flex-row items-center bg-white rounded-md border p-2'>
                        <MagnifyingGlassIcon className='text-[#D9D9D9] ml-2' />
                        <input
                            placeholder="ค้นหาชื่อนักศึกษา..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm border-none outline-none ml-2"
                        />
                    </div>
                    <div className='flex gap-3'>
                        <Button className='bg-[#0249B1]' onClick={generateTable}>
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            ปริ้นรายชื่อ
                        </Button>
                        <Button className='bg-[#41B06E]' onClick={() => setNewStatus()}>
                            <CheckIcon className="mr-2 h-4 w-4" />
                            ผ่าน
                        </Button>
                        <Button className='bg-[#DC143C]' onClick={() => deleteUser()}>
                            <TrashIcon className="mr-2 h-4 w-4" />
                            ลบ
                        </Button>
                    </div>
                </div>
                <div className="bg-white rounded-md p-4 shadow-md">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    )
}
