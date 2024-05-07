import { DiamondPlus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
}
const Meetingcard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
    return (

        <div className={` px-6 py-6  w-full rounded-[14px]  flex flex-col justify-between  xl:min-h-[240px] max-w-[240px] cursor-pointer ${className}`} onClick={handleClick} >
            <div className="flex items-center justify-center  bg-white bg-opacity-30 size-12 rounded-[10px]">    
            <Image alt="icon"
            src ={img}
            width={34}
            height={34}
            className='rounded-[12px] opacity-100 '
            z-index={99}
            />
            </div>
            <div className=" text-white flex flex-col ">
                <h2 className="text-white text-xl font-bold tracking-tighter">{title}</h2>
                <p className="text-white text-lg font-normal">{description}</p>
            </div>
        </div>
    )
}

export default Meetingcard;
