"use server"
import prisma from "../db";
export default async function findUser(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        return false;
    }
    return true;
}