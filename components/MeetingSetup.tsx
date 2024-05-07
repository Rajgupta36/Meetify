'use client';
import { CallControls, DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setUpComplete}:{setUpComplete:(value:boolean)=>void}) => {
  const[isMicCamOn,setMiCamOn]=useState(false);
  const call= useCall();
  if(!call){
    throw new Error("used call must be used within stream call component");
  }
  useEffect(()=>{
     if(isMicCamOn){
       call?.camera.disable();
       call?.microphone.disable();
     }else{
      call?.camera.enable();
      call?.microphone.enable();
     }
  },[isMicCamOn,call?.microphone,call?.camera])
  
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>SetUp</h1>
        <VideoPreview/>
        <div className='flex h-16 items-center justify-center gap-3'>
          <label className='flex items-center justify-center gap-2 font-medium'>
            <input type='checkbox'
            checked={isMicCamOn}
            onChange={(e)=>setMiCamOn(e.target.checked)}
            />
            Join with mic and camera off
          </label>
            <DeviceSettings/>
        </div>
       
        <Button className='rounded-md bg-orange-1 px-4 py-2.5' onClick={()=>{call.join();
          setUpComplete(true);
        }}>Join meeting</Button>

      
    </div>
  )
}

export default MeetingSetup;
