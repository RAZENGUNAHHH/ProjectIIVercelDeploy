import React from 'react'
import { member_type } from '../../../type/type';

export default function ExportTable({ data, columns, name_course }: { data: member_type[], columns: { name: string, key: string }[], name_course: string }) {
    const styleTable = {
        border: "1px solid",
        padding: "10px",
    };

    // Generate table rows from data
    const tableRows = data.map((item: any, index: number) => (
        <tr key={index}>
            {columns.map((col: { name: string, key: string }) => {
                return (
                    <td key={index + 'x'} style={styleTable}>{item[col.key]}</td>
                )
            })}
        </tr>
    ));

    return (
        <div id='tableExport' className='w-full flex flex-col justify-center items-center px-10'>
            <h2 className='pb-3'>รายชื่อนักศึกษาที่ลงทะเบียนค่าย {name_course}</h2>
            <table className='border-collapse border w-full'>
                <thead>
                    <tr>
                        {columns.map((item: { name: string, key: string } , index) => {
                            return (
                                <th key={index + 'a'} style={styleTable}>{item.name}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}
