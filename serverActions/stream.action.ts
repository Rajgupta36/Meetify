"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { StreamClient, UserObjectRequest } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const token = process.env.NEXT_STREAM_APP_TOKEN;

export const tokenProvider = async () => {
    const { user } = await getServerSession(authOptions);

    if (!user) throw new Error('User not found');
    if (!apiKey) throw new Error('API key not found');
    if (!token) throw new Error('Token not found')
    const client: any = new StreamClient(apiKey, token)

    const userId = user.id;
    const newUser: UserObjectRequest = {
        id: userId,
        role: 'user',
        custom: {
            color: 'red',
        },
        name: user.name || user.email,
        image: user.image || `https://getstream.io/random_svg/?name=${user.name.charAt(0) || user.email.charAt(0)}`,
    };
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issuedAt = Math.round(new Date().getTime() / 1000) - 60;
    const usertoken = client.createToken(userId, exp, issuedAt);
    return usertoken;

}

