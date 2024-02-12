'use server';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

async function getUser(username: string): Promise<User | null> {
    const users: User[] | null = await prisma.user.findMany({
        where: {
            username: username,
        },
    });
    const user: User | null = users[0];
    console.log(JSON.stringify(user));
    return user;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        credentials: {
            username: { label: "Username" },
            password: {  label: "Password", type: "password" }
        },
      async authorize(credentials, req) {
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