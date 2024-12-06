import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string) => {
  const [call, setcall] = useState<Call>();
  const [isloading, setloading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: { id },
      });


      if (calls.length > 0) {
        setcall(calls[0]); // Update the call state
        setloading(false); // Update the loading state
      } else {
        setloading(false); // Stop loading if no calls are found
      }
    };

    loadCall();
  }, [client, id]);



  useEffect(() => {
    console.log("Call state updated:", call);
  }, [call]);

  return { call, isloading };
};
