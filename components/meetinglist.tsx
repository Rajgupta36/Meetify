'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Meetingcard from './meetingcard'
import MeetingModal from './meetingModel';
import { useSession } from 'next-auth/react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker"
import { Input } from './ui/input';

const Meetinglist = () => {
  const { toast } = useToast()
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
     >(undefined);
    const [value,setvalue] =useState({dateTime: new Date(),description:'',link:''});
    const{data:session,status} = useSession();
    const client =useStreamVideoClient()
    const [callDetails,setCallDetails] =useState<Call>();



    const createMeeting=async()=>{
      if(status === "unauthenticated") return router.push('/auth/signin')
    if(!client||!session?.user) return ;
    try{
     const id =crypto.randomUUID();
     const call =client.call('default',id);
     if(!call) throw Error('Call not found');
      const startsAt =value.dateTime.toISOString()||new Date(Date.now()).toISOString();
      const description =value.description || "Instant Meeting";
     

      await call.getOrCreate({
        //@ts-ignore
           data:{starts_at:startsAt,custom:{description}}

      })
      setCallDetails(call);  
      toast({title:'Meeting created successfully'})
      if(!value.description) {
        router.push(`/meeting/${call.id}`)
      }
     
   
       
    }catch(err){
      toast({
        variant: "destructive",
        title: " Failed to create meeting",
      })}
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_API_URL}/meeting/${callDetails?.id}`
  return (
    <div>
      <div  className=' mx-6 grid  gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <Meetingcard img={"joo"} 
            title ={`New Meeting `}
            description={`Setup a new recording`}
            className={"bg-orange-1"}
            handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <Meetingcard img="hii" 
            title ={"Join Meeting"}
            description={`via invite link`}
            className="bg-blue-1"
            handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            
            <Meetingcard img="hii" 
            title ={"Schedule Meeting"}
            description={`hii`}
            className="bg-violet-1"
            handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <Meetingcard img="hii" 
            title ={"View Meeting"}
            description={`Meeting recordings`}
            className="bg-yellow-1"
            handleClick={() => router.push('/recording')}
            />
         
          {!callDetails ?(
            <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}>
             <div className=' flex flex-col gap-2.5 '>
              <label className='text-base text-normal leading-[20px]  text-sky-100'>Add a description</label>
              <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0 ' onChange={(e)=>{setvalue({...value,description:e.target.value})}}/>
             </div>
             <div className='flex w-full flex-col gap-2.5 '>
             <label className='text-base text-normal leading-[20px]  text-sky-100'>Select date and time</label>
             <ReactDatePicker selected={value.dateTime} onChange={(date)=>{setvalue({...value,dateTime:date!})}}
             showTimeSelect
             timeFormat='HH:mm'
             timeIntervals={15}
             timeCaption='time'
             dateFormat={"MMMM d,YYYY h:mm aa"} 
             className='w-full rounded bg-dark-2 p-2 focus:outline-none'/>
             </div>
            </MeetingModal>)
          
          :
          
          (<MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => {setMeetingState(undefined); setCallDetails(undefined); }}
            title="Meeting Created"
            handleClick={()=>{navigator.clipboard.writeText(meetingLink); 
              toast({title:'Link copied'})
            }
            }
            image='icon.svg'
            buttonIcon=''
            buttonText="Copy Meeting Link"
            className='text-center'
            
          />)}
      </div>
         <MeetingModal
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          handleClick={createMeeting}
          className='text-center'
          buttonText='Start Meeting'
        />
         <MeetingModal
          isOpen={meetingState === 'isJoiningMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          handleClick={()=>router.push(value.link)}
          className='text-center'
          buttonText='Start Meeting'
        >
          <Input placeholder='Enter invitation link'
          className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e)=>{setvalue({...value,link:e.target.value})}}/>
        </MeetingModal>
    </div>
  )
}

export default Meetinglist
