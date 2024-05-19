'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { anim_out, anim_in } from './anim'
import { registration } from '../../../action/registration'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {}
type Inputs_signIn = {
    email: string
    pwd: string
}


type Inputs_regis = {
    email: string
    pwd: string
    confpwd : string,
    std_id : string,
    ac_y : number,
    name : string,
    sur_n : string
}
export default function Inner({}: Props) {
    const [register_display, setRegister_display] = useState<boolean>(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()

  
    const onHandleSignIn: SubmitHandler<Inputs_signIn> = async (data) => {
        try {
            const res  = await signIn('credentials',
                {
                    redirect: false,
                    email: data.email,
                    pwd: data.pwd,
                }
            )
            if(res!.ok){
                router.push('/home')

            }else{
                    toast.error(res!?.error)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const password = watch("pwd"); // ดูค่าในฟิลด์ "Password"
    const isPasswordMatch = (value : string) => value === password; // ฟังก์ชันเพื่อตรวจสอบว่าค่าตรงกับ password หรือไม่
    
    const onHandleRegistration: SubmitHandler<Inputs_regis> = async (data) => {
        try {
           const result = await registration(data)
           if(result.statusCode == 200){
                toast.success('Successfully')
                return
           }else{
                toast.error(result.msg)
           }
        } catch (err) {
            console.log(err)
        }
    }

    
  return (
    <div className='basis-[20em] grow flex items-center w-full'>
        <AnimatePresence>
                    {
                        !register_display ?
                            <motion.div initial={register_display ? anim_out.initial : anim_in.initial} animate={register_display ? anim_out.animate : anim_in.animate} exit={register_display ? anim_out.exit : anim_in.exit} className='w-full flex justify-center items-center flex-col px-[5rem] '>
                                <h2 className='self-start text-[2.5em] font-bold text-[#03396c] '>Login</h2>
                                <p className='self-start'> Welcome back</p>
                                <form onSubmit={handleSubmit(onHandleSignIn)} className='flex flex-col w-full mt-10'>
                                    <label htmlFor="email" className='flex w-[100%] h-[8vh] border'>
                                        <div className='flex items-center justify-center grow basis-[0px] '>
                                            <Image src={'/email_icon.svg'} width={40} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                        </div>
                                        <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                            <p className=''>Email : <span className='text-red-600'> {errors.email ? 'Invalid email format': null}</span> </p>
                                            <input id='email'  {...register('email' ,{required : true , pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})} className='outline-none font-bold w-full' />
                                        </div>
                                    </label>
                                    <label htmlFor="pwd" className='flex w-[100%] h-[8vh] border'>
                                        <div className='flex items-center justify-center grow basis-[0px]'>
                                            <Image src={'/lock.svg'} width={40} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                        </div>
                                        <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                            <p className=''>Password : <span className='text-red-600'> {errors.pwd ? 'Password is required': null}</span> </p>
                                            <input id='pwd' {...register('pwd',{required : true })} className='outline-none font-bold w-full' type='password' />
                                        </div>
                                    </label>
                                    <div className='mt-5 flex justify-start  w-full gap-x-5'>
                                        <button type='submit' className='w-[40%] text-center rounded-[12px] border h-[4vh] bg-[#03396c] text-white'> Login now </button>
                                        <button type='button' className='w-[40%] text-center rounded-[12px] border h-[4vh]' onClick={() => setRegister_display(!register_display)}> Create account</button>
                                    </div>
                                    <button type='button' className='self-start mt-4 duration-200 hover:text-[#005b96] hover:font-bold'> Forgot password ?</button>
                                    <div className='flex items-center flex-col justify-center mt-5'>
                                            <Image src={'/google.svg'} width={50} height={50} alt='google' className='cursor-pointer' onClick={()=> signIn('google')}/>

                                    </div>
                                </form>
                            </motion.div> :
                            null
                    }
                </AnimatePresence>

                    {/* registration */}
                <AnimatePresence  >
                    {
                        register_display ? <motion.div initial={!register_display ? anim_out.initial : anim_in.initial} animate={!register_display ? anim_out.animate : anim_in.animate} exit={!register_display ? anim_out.exit : anim_in.exit} className='w-full flex justify-center items-center flex-col px-[5rem] '>
                        <h2 className='self-start text-[2.5em] font-bold text-[#03396c] '>Registration</h2>
                        <p className='self-start'> Join with us </p>
                        <form onSubmit={handleSubmit(onHandleRegistration)} className='flex flex-col w-full mt-5'>
                        
                        <label htmlFor="name" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/file.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='name'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>First Name :  </p>
                                    <input id='name'  {...register('name' , {required : true })} className='outline-none font-bold w-full' />
                                </div>
                        </label>
                        <label htmlFor="sur_n" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/file.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='sur_n'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>Sure name : </p>
                                    <input id='sur_n'  {...register('sur_n' , {required : true })} className='outline-none font-bold w-full' />
                                </div>
                            </label>
                            <label htmlFor="email" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/email_icon.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>Email : <span className='text-red-600'> {errors.email ? 'Invalid email format': null}</span> </p>
                                    <input id='email'  {...register('email' , {required : true , pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})} className='outline-none font-bold w-full' />
                                </div>
                            </label>
                            <label htmlFor="pwd" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px]'>
                                    <Image src={'/lock.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>Password : <span className='text-red-600'> {errors.pwd ? 'Password is required': null}</span>  </p>
                                    <input id='pwd' {...register('pwd' , {required : true})} className='outline-none font-bold w-full' />
                                </div>
                            </label>
                            <label htmlFor="confpwd" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/lock.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                    
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>Confirm Password :   <span className='text-red-600'> {errors.confpwd ? 'Password Not Match': null}</span>  </p>
                                   
                                    <input id='confpwd'  {...register('confpwd' ,{ required : true , validate : isPasswordMatch})} className='outline-none font-bold w-full'  />
                                  
                                </div>
                            </label>
                            <label htmlFor="std_id" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/person.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>StudentID : <span className='text-red-600'> {errors.std_id ? 'Student_id is required': null}</span>  </p>
                                    <input min={0}  id='std_id'  {...register('std_id' , {required : true})} className='outline-none font-bold w-full' type='number' />
                                </div>
                            </label>
                            <label htmlFor="ac_y" className='flex w-[100%] h-[7vh] border'>
                                <div className='flex items-center justify-center grow basis-[0px] '>
                                    <Image src={'/level.svg'} width={30} height={50} style={{ objectFit : 'cover'}} alt='email'/>
                                </div>
                                <div className='flex flex-col gap-y-1 justify-center items-start grow-[2] basis-[10em] py-5 '>
                                    <p className=''>Academy year : <span className='text-red-600'> {errors.ac_y ? 'ac_y is required': null}</span>  </p>
                                    <input id='ac_y' min={0} max={5} type='number' {...register('ac_y' , {required : true})} className='outline-none font-bold w-full' />
                                </div>
                            </label>
                            <div className='mt-5 flex justify-start  w-full gap-x-5'>
                                <button type='submit' className='w-[40%] text-center rounded-[12px] border h-[4vh] bg-[#03396c] text-white' > Create account</button>
                                <button type='button' className='w-[40%] text-center rounded-[12px] border h-[4vh] ' onClick={() => setRegister_display(!register_display)}> Login now </button>
                            </div>
                        </form>
                    </motion.div>
                    : null
                    }
                </AnimatePresence>
    </div>
  )
}