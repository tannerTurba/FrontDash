import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

/* To run this function, add a call to the 'runner.ts' file. */
export async function createUser(username: string, password: string, status: string): Promise<User> {
  const prisma = new PrismaClient();
  const hashedPassword = await hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        status: status
      },
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
  return null;
}

export async function insertUserReachedAt(userId: string, contactId: string) {
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`INSERT INTO ReachedAt (userId, contactId, businessId) VALUES (${userId}, ${contactId}, NULL)`;
  }
  catch (error) {
    console.error('Error executing raw query(insertUserReachedAt):', error);
  }
  finally {
    await prisma.$disconnect();
  }
}

export async function insertWorksAs(userId: number, roleId: number, status: string) {
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`INSERT INTO WorksAs (userId, roleId, status) VALUES (${userId}, ${roleId}, ${status})`;
  }
  catch (error) {
    console.error('Error executing raw query(insertWorksAs):', error);
  }
  finally {
    await prisma.$disconnect();
  }
}

export async function insertWorksFor(userId: number, businessId: number) {
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`INSERT INTO WorksFor (userId, businessId) VALUES (${userId}, ${businessId})`;
  }
  catch (error) {
    console.error('Error executing raw query(insertWorksFor):', error);
  }
  finally {
    await prisma.$disconnect();
  }
}