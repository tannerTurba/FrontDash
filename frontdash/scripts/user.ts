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

export async function getWorkingFor(userId: number) {
  const prisma = new PrismaClient();
  let businessId;
  try {
    businessId = await prisma.$queryRaw`SELECT Business.id
      FROM User JOIN WorksFor ON User.id = WorksFor.userId 
        JOIN Business ON Business.id = WorksFor.businessId 
      WHERE User.id = ${userId};`;
  }
  catch (error) {
    console.error('Error executing raw query(getWorkingFor):', error);
  }
  finally {
    await prisma.$disconnect();
  }
  return businessId[0].id as string;
}

export async function getEmployees(managerBusinessId: string): Promise<User[]> {
  const prisma = new PrismaClient();
  let users;
  try {
      users = await prisma.$queryRaw`SELECT User.*
                                    FROM User 
                                    JOIN WorksFor ON User.id = WorksFor.userId 
                                    JOIN Business ON WorksFor.BusinessId = Business.id
                                    WHERE Business.id = ${managerBusinessId};`;
  } catch (error) {
      console.error('Error fetching Users:', error);
  } finally {
      await prisma.$disconnect();
  }
  return users as User[];
}

export async function updateUserStatus(id: number | string, status: string) {
  const prisma = new PrismaClient();
  try {
    await prisma.$executeRaw`UPDATE User SET status = ${status} WHERE id = ${id};`;
  } catch (error) {
    console.error('Error updating User status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllDrivers() {
  const prisma = new PrismaClient();
  let users;
  try {
      users = await prisma.$queryRaw`SELECT User.id AS id, User.username AS name, User.status AS status
        FROM User JOIN WorksAs ON User.id = WorksAs.userId
          JOIN Role ON Role.id = WorksAs.roleId
        WHERE Role.title = 'driver'`;
  } catch (error) {
      console.error('Error fetching Drivers:', error);
  } finally {
      await prisma.$disconnect();
  }
  return users as User[];
}