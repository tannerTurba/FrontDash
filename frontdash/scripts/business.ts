import { PrismaClient, Business, Food, ContactInfo, Availability } from '@prisma/client';

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
    try {
        return await prisma.business.findMany();
    }
    catch (error) {
        console.error('Error fetching restaurants:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function getRestaurantById(businessId: number): Promise<Business | null> {
    const prisma = new PrismaClient();
    try {
        return await prisma.business.findUnique({
            where: {
                id: businessId,
            },
        });
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAvailabilityByBusiness(businessId: number) {
    const prisma = new PrismaClient();
    try {
        const availability = await prisma.$queryRaw`
            SELECT a.*
            FROM Availability a
            INNER JOIN OpenDuring od ON a.id = od.availabilityId
            WHERE od.businessId = ${businessId};
        `;
        return availability as Availability;
    } catch (error) {
        console.error('Error fetching availability:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getContactInfoByBusiness(businessId: number) {
    const prisma = new PrismaClient();
    try {
        const contactInfo = await prisma.$queryRaw`
            SELECT ci.*
            FROM ContactInfo ci
            INNER JOIN ReachedAt ra ON ci.id = ra.contactId
            WHERE ra.businessId = ${businessId};
        `;
        return contactInfo as ContactInfo;
    } catch (error) {
        console.error('Error fetching contact info:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getFoodItemsByBusiness(restaurantId: string) {
    const prisma = new PrismaClient();
    try {
      const menuItems = await prisma.$queryRaw`
        SELECT f.*
        FROM Food f
        INNER JOIN Offers o ON o.foodId = f.id
        WHERE o.businessId = ${restaurantId}
      `;
      return menuItems as Food[];
    } catch (error) {
      console.error('Error executing raw query(getFoodItemsByBusiness):', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }