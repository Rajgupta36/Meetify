import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const Navbar = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div className='bg-dark-2 h-16 w-auto flex flex-row justify-between items-center  text-white'>
      <div className='ml-4 p-4 flex flex-row justify-center items-center font-bold text-2xl'><Image
      src="next.svg"
      width={52}
      height={52}
      quality={100}
      alt="logo"
    /> Meetify</div>
   
      <div className='mr-8 -3 px-6 py-2 rounded-md flex items-center justify-center'>
  {session ? (
    <img
      className='rounded-full border-2 border-white'
      src={session.user.image}
      height={48}
      width={48}
      alt={session.user.name}
    />
  ) : (
    <a href='/signin' className='text-white font-bold px-4 py-2  bg-blue-1 rounded-lg'>Sign In</a>
  )}
  
</div>

    </div>
  )
}

export default Navbar;
