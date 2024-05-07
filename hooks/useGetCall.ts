'use client';
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { tokenProvider } from "./useSession";



export const useGetCall = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const client = useStreamVideoClient();
    const [Loading, isLoading] = useState(false);

    useEffect(() => {
        const loadCalls = async () => {
            const user = await tokenProvider();
            if (!client || !user?.id) return;
            isLoading(true);
            try {
                const { calls } = await client.queryCalls({
                    sort: [
                        { field: 'starts_at', direction: -1 },
                    ],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user?.id },
                            { members: { $in: [user?.id] } }
                        ],
                    },
                });
                setCalls(calls);
            } catch (e) {
                console.error(e);
            } finally {
                isLoading(false);
            }
        }
        loadCalls();
    }
        , [client]);

    const now = new Date();
    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => { return (startsAt && new Date(startsAt) < now) || !!endedAt });
    const UpcomingCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => { return (startsAt && new Date(startsAt) > now) });
    return {
        endedCalls,
        UpcomingCalls,
        CallRecordings: calls,
        Loading,
    }
}