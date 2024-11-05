import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "../../../db";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@gmail.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {
                try {
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });

                    // If the user exists, compare the password
                    if (existingUser) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.email
                            };
                        }
                        return null; // Incorrect password
                    }

                    // If the user does not exist, create a new user
                    const hashPassword = await bcrypt.hash(credentials.password, 10); // Only hash on sign-up
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashPassword,
                            name: credentials.name || "Default Name", // Add name if it's part of the credentials
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    };

                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub;
            return session;
        }
    }
};

export default NextAuth(authOptions);
