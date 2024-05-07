"use client"
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { tokenProvider } from '../../serverActions/stream.action';
import Loader from '@/components/loader';
import { useSession } from 'next-auth/react';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
import { useRouter } from 'next/navigation';
const StreamVideoProvider = ({children}:{children:React.ReactNode}) => {
  const router = useRouter();
  const {data:session,status} =  useSession();
  const [videoclient,setvideoclient] =useState<StreamVideoClient>();
  
  useEffect(()=>{
    if(status === "unauthenticated") {router.push('/signin')}
    if (status !== 'authenticated' || !session ) return;
    if(!apiKey)  throw Error('API key not found');
    if(session){}
    //@ts-ignore
    const client = new StreamVideoClient({apiKey,user:{
      id:session?.user?.email,
      name:session?.user?.name || session?.user?.email?.charAt(0).toUpperCase,
      image:session?.user?.image || `https://getstream.io/random_png/?id=curious-sun-9&name=${session?.user?.name || session?.user?.email?.charAt(0).toUpperCase}`,
    },
    tokenProvider: tokenProvider
  })
  setvideoclient(client);
},[status])

if(!videoclient){
  return <Loader/>
}



return (
    <StreamVideo client={videoclient}>
      {children}
    </StreamVideo>
  );
};


export default StreamVideoProvider;