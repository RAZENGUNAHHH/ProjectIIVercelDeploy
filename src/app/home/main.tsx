'use client'
import React from 'react'
import Image from 'next/image'
import homePic from '../../../public/picture/home.svg'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import CardCamp from '../components/CardCamp'
import { Course_table } from '../../../type/type'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
    role : string
    engineerCamp : Course_table[] | [],
    geniusCamp : Course_table[] | []
}

export default function Main({role ,engineerCamp ,geniusCamp  }: Props) {
    const { data : session } = useSession()
    // @ts-ignore
    const id_u = session?.user?.id
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <section className='grow-[2]'>
            <div className='w-full flex flex-wrap items-center justify-between mx-auto py-4 px-12'>
                <p className='text-5xl p-0 font-bold text-[#011F4B]'>ESC <span className='text-2xl'>ข่าวสาร</span></p>
            </div>
            <div className='w-full bg-black'>
                <Image
                    src={homePic}
                    alt="Picture of su smart plus"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className='w-full flex-col bg-[#F1F1F1] flex flex-wrap justify-center items-center py-8 '>
            <div className='flex justify-between w-full px-[10%]'>
                <h3 className='self-start  mb-4 font-bold text-[24px] text-[#011F4B]'> ค่ายอัจฉริยะ</h3>
              <Link href={'/geniusCamp'} className='text-[#011F4B] underline '> ดูค่ายทั้งหมด</Link>
          </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full max-w-[80%]"
                >
                    <CarouselContent className='-ml-4'>
                        {geniusCamp?.length > 0 ?
                            geniusCamp.map((course, index) => (     
                                <CarouselItem suppressHydrationWarning={false} key={index + 'carousel'} className='pl-10 basis-1/3'>
                                    <CardCamp index={index} course={course} id_user={id_u} role={role} />
                                </CarouselItem>

                            ))
                            : <p> ไม่มีข้อมูล</p>
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className='w-full flex-col bg-[#F1F1F1] flex flex-wrap justify-center items-center py-8 '>
          <div className='flex justify-between w-full px-[10%]'>
                <h3 className='self-start  mb-4 font-bold text-[24px] text-[#011F4B]'> EngiCamp</h3>
              <Link href={'/engiCamp'} className='text-[#011F4B] underline '> ดูค่ายทั้งหมด</Link>
          </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full max-w-[80%]"
                >
                    <CarouselContent className='-ml-4'>
                        {engineerCamp?.length > 0 ?
                            engineerCamp.map((course, index) => (     
                                <CarouselItem suppressHydrationWarning={false} key={index + 'carousel'} className='pl-10 basis-1/3'>
                                    <CardCamp index={index} course={course} id_user={id_u} role={role} />
                                </CarouselItem>

                            ))
                            : <p> ไม่มีข้อมูล</p>
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
