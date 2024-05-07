
"use client";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { tokenProvider } from "@/hooks/useSession";
import { Copy } from "lucide-react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium   text-sky-200 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};
interface User {
  id : string,
  name:string,
  email:string,
  image:string
}
const PersonalRoom = () => {
  const [user,setUser]= useState<User>();
  useEffect(()=>{
   
    const fetchdata = async()=>{
      const data = await tokenProvider();
      setUser(data);
    }
    fetchdata();
  },[])
  const router = useRouter();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  
  const meetingId = user?.id;
  
  const { call } = useGetCallById(meetingId!);
  
  const startRoom = async () => {
    if (!client) return;
     if(!user){ return <Loader/>}

    const newCall = client.call("default", meetingId!);
    
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_API_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="bg-dark-2 m-8 p-6 rounded-[14px] flex  flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.name}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
         <Copy/> Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;