'use server';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

export async function getUser(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
        username: username,
    },
});
console.log(JSON.stringify(user));
return user as User;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
        credentials: {
            username: { label: "Username", type: "text" },
            password: {  label: "Password", type: "password" }
        },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            console.log(`Username: ${username} \nPassword: ${password}`);
            let user = await getUser(username);
            if (!user) {
                return Promise.resolve(null);
            }
            
            const passwordsMatch = await bcrypt.compare(password, user.password as string);
            console.log(passwordsMatch);
            if (passwordsMatch) {
                return Promise.resolve(user);
            }
        }

        return Promise.resolve(null);
      }
    })
  ]
});