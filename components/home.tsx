import React from 'react'
import Meetinglist from './meetinglist';



const Home = () => {
    const  now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = (new Intl.DateTimeFormat('en-US',{dateStyle:'full'})).format(now);
  return (
    <section className='flex  flex-col gap-4 text-white w-full'>
        <div className='h-[300px]  rounded-[20px] bg-hero bg-center bg-cover  m-6 '>
    <div  className=' flex h-full flex-col justify-between p-4'>

        <h2 className='text-black bg-white bg-opacity-25 backdrop-blur-3xl max-w-[270px] rounded text-center text-base py-2  font-bold '>Upcoming meeting at  12:30PM</h2>
     <div className='flex flex-col gap-4'>
        <h1 className='ml-2 text-left text-5xl font-extrabold  text-black pb-0'>{time}</h1>
        <p className=' text-slate-600 max-w-[270px] text-xl text-base pb-4  font-bold  text-sky-1 font-2xl'>{date}
        </p>
     </div>
    
    </div>
        </div>
        <div className=''><Meetinglist/></div>
         

    </section>
  )
}

export default Home;
