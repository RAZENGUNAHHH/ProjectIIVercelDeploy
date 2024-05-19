

import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useState } from 'react'
import { UploadButton } from "@/utils/uploadthing";
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAnimate } from 'framer-motion';
import { Course_tag, Course_type } from '../../../../type/type';
import { upload_file } from '../../../../action/uploadImg';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
type Props = {
    isOpenModel: boolean
    setIsOpenModel: React.Dispatch<React.SetStateAction<boolean>>
}



export default function Model_form({ isOpenModel, setIsOpenModel }: Props) {
    const [status_upload, setStatus_upload] = useState<string>('')
    const [model, animate_model] = useAnimate()
    const [img_url, setImg_url] = useState<string>('')
    const [pending_img, setPending_img] = useState<boolean>(false)

    useEffect(() => {
        animate_model(model.current, {
            opacity: isOpenModel ? 1 : 0,
            transition: {
                duration: 0.1
            }

        })

    }, [animate_model, model, isOpenModel])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Course_type>()

    const onSubmit: SubmitHandler<Course_type> = useCallback(async (data) => {
        if (!img_url) return toast.error('Please Upload img')
        const courseData = { ...data, img_src: img_url }
        const res = await upload_file(courseData)
        if (res?.status == 200) {
            toast.success('Successfully')
        } else {
            toast.success(res.msg)
        }
    }, [img_url])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn('fixed  top-0 hidden w-full min-h-[100vh] bg-black z-10 bg-opacity-70 justify-center items-center', { 'flex': isOpenModel })}>
            <div ref={model} className={cn('bg-[#FFFFFF] block w-[30vw] max-h-[90vh] min-w-fit scale-0 shadow-md rounded-xl', { 'scale-1': isOpenModel })}>
                <nav className='w-full h-[10vh] bg-gradient-to-r from-[#011F4B] to-[#0249B1] flex items-center justify-between px-5 text-white shadow-md rounded-t-md' >
                    <h6>   แบบฟอร์มการเพิ่มค่ายอัจฉริยะ </h6>
                    <button onClick={() => setIsOpenModel(!isOpenModel)} type='button' > <Cross2Icon className='size-10' /> </button>
                </nav>

                {/*  main form */}
                <div className='w-full px-10 py-5 flex flex-col gap-y-2 '>
                    <div className='flex w-full gap-x-10'>
                        <Label_compo register={register} htmlId={Course_tag.name} text_label={'ชื่อค่าย'} className={'w-[100%]'} />
                        <Label_compo_select register={register} htmlId={Course_tag.category} text_label={'ประเภท'} className={'w-[100%]'} />
                    </div>
                    <div className='flex w-full gap-x-10'>
                        <Label_compo register={register} htmlId={Course_tag.st_date} text_label={'วันที่เริ่ม'} type_input={'date'} />
                        <Label_compo register={register} htmlId={Course_tag.en_date} text_label={'วันที่สิ้นสุด'} type_input={'date'} />
                    </div>
                    <div className='flex w-full gap-x-10'>
                        <Label_compo register={register} htmlId={Course_tag.instructor} text_label={'ชื่อผู้สอน'} />
                        <Label_compo_number register={register} htmlId={Course_tag.limited} text_label={'ระบุจำนวนจำกัด'} type_input='number' />
                    </div>
                    <h6> การลงทะเบียน</h6>
                    <div className='flex w-full gap-x-10'>
                        <Label_compo register={register} htmlId={Course_tag.st_enrol} text_label={'วันที่เริ่ม'} type_input={'date'} />
                        <Label_compo register={register} htmlId={Course_tag.en_enrol} text_label={'วันที่สิ้นสุด'} type_input={'date'} />
                    </div>
                    <Text_area_compo register={register} htmlId={Course_tag.detail} text_label={'รายละเอียด'} />
                    <div className='flex items-center gap-x-5 mt-4'>
                        <UploadButton
                            className=''
                            endpoint="imageUploader"
                            onUploadBegin={() => setPending_img(true)}
                            onClientUploadComplete={async (res) => {
                                // Do something with the response
                                setPending_img(false)
                                setStatus_upload('Upload successfully')
                                setImg_url(res[0].url)
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                toast(`ERROR! ${error.message}`);
                            }}
                        />
                        {status_upload ?
                            <p className='text-green-600 '>{status_upload}</p>
                            : null

                        }
                    </div>
                    <Button disabled={pending_img} className='self-end w-[6rem] h-[2.5rem] bg-[#0249B1] text-white rounded-md shadow-md' type='submit'> เพิ่ม</Button>
                </div>
            </div>
        </form>
    )
}


type Label_compo_type = {
    htmlId: Course_tag,
    text_label: string
    type_input?: 'date' | '' | 'number'
    className?: string,
    register: UseFormRegister<Course_type>

}

const Label_compo = ({ htmlId, text_label, type_input, className, register }: Label_compo_type) => {

    return (
        <label htmlFor={htmlId}>
            <h6> {text_label}</h6>
            <input    {...register(htmlId, { required: true })} type={type_input} id={htmlId} className={cn('outline-none border px-3 py-1 rounded-sm', className)} />
        </label>
    )
}

const Label_compo_select = ({ htmlId, text_label, type_input, className, register }: Label_compo_type) => {

    return (
        <label htmlFor={htmlId}>
            <h6> {text_label}</h6>
            <select {...register(htmlId, { required: true })}  id={htmlId} className={cn('outline-none border px-3 py-1 rounded-sm', className)}>
                <option value="genius">ค่ายอัจฉริยะ</option>
                <option value="engineer">ค่าย engineer </option>
            </select>
        </label>
    )
}

const Label_compo_number = ({ htmlId, text_label, type_input, className, register }: Label_compo_type) => {

    return (
        <label htmlFor={htmlId}>
            <h6> {text_label}</h6>
            <input      {...register(htmlId, { required: true, max: 99, min: 1 })} type={type_input} id={htmlId} className={cn('outline-none border px-3 py-1 rounded-sm', className)} />
        </label>
    )
}

const Text_area_compo = ({ htmlId, text_label, className, register }: Label_compo_type) => {

    return (
        <label htmlFor={htmlId}>
            <h6> {text_label}</h6>
            <textarea {...register(htmlId, { required: true })} className={cn('outline-none border resize-none px-3 py-1', className)} id={htmlId} cols={50} rows={8} ></textarea>
        </label>
    )
}