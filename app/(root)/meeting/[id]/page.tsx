"use client"
import React, { useState } from 'react'
import {  StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Meeting = ({params:{id}}:{params:{id:string}}) => {
  const router = useRouter();
  const user  = useSession();
  const [setUpComplete, setSetUpComplete] = useState(false);
   const {call,isloading} = useGetCallById(id);
   if(user.status === "unauthenticated") return router.push('/auth/signin');
   if(isloading) return <Loader/>
  return (
    <div className=' bg-dark-2 h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!setUpComplete ?<MeetingSetup setUpComplete={setSetUpComplete}/>:<MeetingRoom/>}
        </StreamTheme>
      </StreamCall>
      
    </div>
  )
}

export default Meeting;
