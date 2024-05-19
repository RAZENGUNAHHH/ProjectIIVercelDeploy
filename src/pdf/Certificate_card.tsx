import React, { forwardRef } from 'react';
import Image from 'next/image';

type Props = {
  ref: React.ForwardedRef<HTMLDivElement>;
  name : string
};
const Certificate_card = forwardRef<HTMLDivElement, Props>((props,ref) => {
  const { name } = props; // ดึงค่า name ออกมาจาก props
  return (
    <div ref={ref} className=' flex  flex-col w-[50vw] bg-slate-300 h-[40vh] items-center justify-center gap-y-4'>
      <div>
         <Image src={'/picture/Logo.svg'} alt='logo' width={150} height={150} />
      </div>

      <h2 className='text-[24px]'>ภาควิชาวิศกรรมไฟฟ้า</h2>
      <h5 className='text-[24px]'>คณะวิศวกรรมศาสตร์และเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยศิลปากร</h5>
      <h5 className='text-[24px]'>ประกาศนียบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า</h5>
      <h5 className='text-[24px]'>ประกาศนียบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า</h5>
      <p className='text-[24px]'>{name}</p>
      <p className='text-[24px]'>ณ วันที่ 28 กันยายน 2566</p>
    </div>
  );
});

Certificate_card.displayName = 'Certificate_card'; // กำหนดชื่อ Component

export default Certificate_card;
