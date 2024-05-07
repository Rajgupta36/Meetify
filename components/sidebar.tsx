'use client';
import Image from 'next/image';
import React from 'react'
import {sidebarLinks} from '../constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
const Sidebar = () => {
    const pathname =usePathname();
  return (
    <div className=' basis-1/5 h-screen bg-dark-2 text-white'>
      {sidebarLinks.map((item)=>{
          const isActive = pathname  ===item.link 
          const textColor = isActive ? 'bg-dark-3' : 'bg-dark-2';
        return (
            <Link href ={item.link} key={item.label} className={`w-11/12 flex gap-4 items-center p-6 rounded-lg justify-start ${textColor} ml-2 text-left`}>
                <Image src={item.imgUrl} width={24} height={24} alt={item.label}></Image>
                {item.label}
            </Link>
        )
      }) }
       <Button onClick={()=>{signOut()}}>Sign Out</Button>
    </div>
  )
}

export default Sidebar;
