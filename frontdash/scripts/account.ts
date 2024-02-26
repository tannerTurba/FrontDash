import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

/* To run this function, add a call to the 'runner.ts' file. */
export async function createUser(username, password) {
    const hashedPassword = await hash(password, 10);
    try {
        const newUser = await prisma.user.create({
          data: {
            username: username,
            password: hashedPassword,
            status: 'active'
          },
        });
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}