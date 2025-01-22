import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {authConfig} from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import {getUser} from "@/app/lib/auth/get-user-by-email";
import {z} from "zod";
import bcrypt from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
})