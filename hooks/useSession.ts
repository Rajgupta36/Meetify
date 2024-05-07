'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const tokenProvider = async () => {
    try {
        const { user } = await getServerSession(authOptions);
        if (!user) return null;
        return user;
    } catch (error) {
        console.error("Error fetching user session:", error);
        return null;
    }
}
