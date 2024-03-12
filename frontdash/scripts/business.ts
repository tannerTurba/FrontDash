import { PrismaClient, Business } from '@prisma/client';

export async function insertBusinessReachedAt(businessId: string, contactId: string) {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`INSERT INTO ReachedAt (userId, contactId, businessId) VALUES (NULL, \'${contactId}\', \'${businessId}\')`;
    }
    catch (error) {
        console.error('Error executing raw query(insertBusinessReachedAt):', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function insertBusiness(name: string, image: Buffer, description: string): Promise<Business> {
    const prisma = new PrismaClient();
    try {
        return await prisma.business.create({
            data: {
                name: name, 
                image: image,
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