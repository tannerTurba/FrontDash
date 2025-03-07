'use server';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import { authConfig } from './auth.config';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function getUser(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
        username: username,
    },
  });
  prisma.$disconnect();
  return user as User;
}

export async function getUserRole() {
  if (cookies().has('username')) {
    return await getRole(cookies().get('username').value);
  }
  return 'unauthorized';
}

export async function getUserData() {
  if (cookies().has('username')) {
    const username = cookies().get('username').value;
    let user = await getUser(username);
    let role = await getRole(username);
    return {
      ...user,
      role: role
    };
  }
  return 'unauthorized';
}

async function getRole(username: string): Promise<string | null> {
  let user;
  try {
    user = await prisma.$queryRaw`SELECT Role.title
                                    FROM User JOIN WorksAs JOIN Role 
                                      ON User.id = WorksAs.userId
                                        AND Role.id = WorksAs.roleId
                                    WHERE User.username = ${username}`;
  }
  catch (error) {
    console.error('Error executing raw query:', error);
  }
  finally {
    await prisma.$disconnect();
  }
  if (user) {
    return user[0].title;
  }
}

export async function changeCredentials(newPassword: string) {
  const username = cookies().get('username').value;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  let status = "";

  try {
    const updatedRow = await prisma.user.update({
      where: { username: username },
      data: { password: hashedPassword },
    });
    status = "Password updated successfully."
  }
  catch (error) {
    status = error.toString;
  }
  finally {
    await prisma.$disconnect();
  }
  return status;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy:'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  // adapter: PrismaAdapter(prisma),
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
              let userData = {
                name: username,
                email: await getRole(username),
                id: user.id,
                picture: null,
              };
              return userData;
              // return Promise.resolve(userData);
            }
            
            const passwordsMatch = await bcrypt.compare(password, user.password as string);
            console.log(passwordsMatch);
            if (passwordsMatch && user.status !== 'inactive') {
              cookies().set('username', user.username);
              return Promise.resolve(user);
            }
        }

        return Promise.resolve(null);
      }
    })
  ]
});