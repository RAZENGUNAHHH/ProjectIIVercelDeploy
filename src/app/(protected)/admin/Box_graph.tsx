import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children : React.ReactNode
    className? : string 
}

export default function Box_graph({children , className}: Props) {
  return (
    <div className={cn('w-[25vw] max-h-[100vh] px-5 py-4 bg-white rounded-md shadow-md' , className)}>
        {children}
    </div>
  )
}