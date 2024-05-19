'use client'
import { useAnimate } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { map_data } from "../../../../type/type";
import { blue, green, orange, red, sky_blue, yellow } from "../../../../map_data";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = {
  index: number
  isOpenState: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
};



export function SelectMap({ index, isOpenState, setIsOpen }: Props) {
  const [label_text, setLabel_text] = useState<string>('')
  const [sub_label, setSub_label] = useState<map_data[]>([])
  const [roll, animate_roll] = useAnimate()
  const [vec, animate_vec] = useAnimate()
  const [color_b, setColor_b] = useState<string>('')





  useEffect(() => {
    switch (index) {
      case 0:
        setLabel_text('โซนธุรกรรม')
        setSub_label(blue)
        setColor_b('#0000FF')
        break;
      case 1:
        setLabel_text('โซนศึกษา')
        setSub_label(sky_blue)
        setColor_b('#008080')
        break;
      case 2:
        setLabel_text('โซนบริการ')
        setSub_label(orange)
        setColor_b('#FFC300')
        break;
      case 3:
        setLabel_text('โซนอาหาร')
        setSub_label(yellow)
        setColor_b('#FFD700')
        break;
      case 4:
        setLabel_text('โซนกิจกรรม')
        setSub_label(red)
        setColor_b('#FF0000')
        break;
      case 5:
        setLabel_text('โซนสีเขียว')
        setSub_label(green)
        setColor_b('#008000')
        break;
    }

  }, [index])


  useEffect(() => {
    const option = {
      height: isOpenState ? 600 : 0,
      transition: {
        duration: 0.1,
        height: {
          duration: 0.4,
        },
      },
      display: isOpenState ? 'inline-flex' : 'none',
      opacity: isOpenState ? 1 : 0,
    };
    const opiton_vec = {
      rotate: isOpenState ? '180deg' : '0',
      transition: {
        duration: 0.2
      }
    }
    animate_roll(roll.current, option);
    animate_vec(vec.current, opiton_vec)
  }, [isOpenState, animate_roll, roll, animate_vec, vec]);
  return (
    <li className={`flex gap-x-2 justify-center items-center relative opp`}>
      <BookmarkFilledIcon color={color_b} />
      <button
        onClick={() => {
          setIsOpen((prev) => {
            const isOpenArray = Array(6).fill(false)
            isOpenArray[index] = !prev[index]
            return isOpenArray
          })
        }}

        className="h-[5vh] max-w-[7vw] justify-between flex items-center gap-x-2"
      >
        {label_text}
        <Image ref={vec} src="/Vector.svg" alt="vec" width={20} height={20} />
      </button>
      <span
        ref={roll}
        className="bg-[#FFFFFF] overflow-y-scroll  absolute top-10   left-[5%] shadow-md opacity-0 border z-10 flex flex-col rounded-sm   "
      >
        {sub_label.length > 1 ?
          sub_label.map((data, index) => (
            <HoverCard key={'map' + index}>
              <HoverCardTrigger   >
                <p className="parent flex hover:bg-[#0249B1] hover:text-white duration-200 px-10 py-5  justify-between items-center w-[40vw] text-[16px]  border-b-2" > <h6> {data.num}</h6> <h6> {data.msg}</h6> </p>
              </HoverCardTrigger>
              <HoverCardContent className={data.detail === '' ? `hidden` : ''} >
                {data.detail}
              </HoverCardContent>
            </HoverCard>
          ))

          : null

        }
      </span>
    </li>
  );
}


