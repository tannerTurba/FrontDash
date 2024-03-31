import { PrismaClient, Business } from '@prisma/client';
import exp from 'constants';

export async function insertBusinessReachedAt(businessId: string, contactId: string) {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`INSERT INTO ReachedAt (userId, contactId, businessId) VALUES (NULL, ${contactId}, ${businessId})`;
    }
    catch (error) {
        console.error('Error executing raw query(insertBusinessReachedAt):', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function insertBusiness(name: string, description: string): Promise<Business> {
    const prisma = new PrismaClient();
    try {
        return await prisma.business.create({
            data: {
                name: name, 
                image: null,
                description: description
            }
        });
    }
    catch (error) {
        console.error('Error inserting Business data:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function getAllRestaurants(): Promise<Business[]> {
    const prisma = new PrismaClient();
    let results = [];
    try {
        results = await prisma.$queryRaw`SELECT * FROM Business WHERE status = 'active'`;
        // return await prisma.business.findMany({
        //     where: {
        //         status: 'active'
        //     }
        // });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    } finally {
        await prisma.$disconnect();
    }
    return results;
}

export async function withdraw(username: string) {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`UPDATE User AS u JOIN WorksFor AS w ON u.id = w.userId
                JOIN Business AS b ON b.id = w.businessId
            SET u.status = 'inactive',
                b.status = 'inactive'
            WHERE u.username = ${username}`;
    }
    catch (error) {
        console.error('Error executing raw query(insertBusinessReachedAt):', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function reactivate(business: string) {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`UPDATE User AS u JOIN WorksFor AS w ON u.id = w.userId
                JOIN Business AS b ON b.id = w.businessId
            SET u.status = 'active',
                b.status = 'active'
            WHERE b.name = ${business}`;
    }
    catch (error) {
        console.error('Error executing raw query(insertBusinessReachedAt):', error);
    }
    finally {
        await prisma.$disconnect();
    }
}