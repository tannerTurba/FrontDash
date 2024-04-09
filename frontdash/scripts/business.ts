import { PrismaClient, Business, Food, ContactInfo, Availability } from '@prisma/client';
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
    let business;
    try {
        business = await prisma.business.create({
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
    return business;
}

export async function getAllActiveRestaurants(): Promise<Business[]> {
    const prisma = new PrismaClient();
    let results = [];
    try {
        results = await prisma.$queryRaw`SELECT * FROM Business WHERE status = 'active'`;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return results;
}

export async function getRestaurantById(businessId: number): Promise<Business | null> {
    const prisma = new PrismaClient();
    let business;
    try {
        business = await prisma.business.findUnique({
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
    return business;
}

export async function getAvailabilityByBusiness(businessId: number) {
    const prisma = new PrismaClient();
    let availability;
    try {
        availability = await prisma.$queryRaw`
            SELECT a.*
            FROM Availability a
            INNER JOIN OpenDuring od ON a.id = od.availabilityId
            WHERE od.businessId = ${businessId};
        `;
    } catch (error) {
        console.error('Error fetching availability:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
    return availability as Availability;
}

export async function getContactInfoByBusiness(businessId: number) {
    const prisma = new PrismaClient();
    let contactInfo;
    try {
        contactInfo = await prisma.$queryRaw`
            SELECT ci.*
            FROM ContactInfo ci
            INNER JOIN ReachedAt ra ON ci.id = ra.contactId
            WHERE ra.businessId = ${businessId};
        `;
    } catch (error) {
        console.error('Error fetching contact info:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
    return contactInfo as ContactInfo;
}

export async function getFoodItemsByBusiness(restaurantId: string) {
    const prisma = new PrismaClient();
    let menuItems;
    try {
        menuItems = await prisma.$queryRaw`
        SELECT f.*
        FROM Food f
        INNER JOIN Offers o ON o.foodId = f.id
        WHERE o.businessId = ${restaurantId}
      `;
    } catch (error) {
        console.error('Error executing raw query(getFoodItemsByBusiness):', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
    return menuItems as Food[];
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

export async function insertOpenDuring(businessId: number, availabilityId: number) {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`INSERT INTO OpenDuring (availabilityId, businessId) VALUES (${availabilityId}, ${businessId})`;
    }
    catch (error) {
        console.error('Error executing raw query(insertOpenDuring):', error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function getAllRestaurants() {
    const prisma = new PrismaClient();
    let results;
    try {
        results = await prisma.$queryRaw`SELECT Business.id AS businessId, User.id AS userId, Business.name AS name, User.username AS manager, Business.status AS status
            FROM Business JOIN WorksFor ON Business.id = WorksFor.businessId
                JOIN User ON User.id = WorksFor.userId
                JOIN WorksAs ON User.id = WorksAs.userId
                JOIN Role ON Role.id = WorksAs.roleId
            WHERE Role.title = 'manager'`;
    }
    catch (error) {
        console.error('Error executing raw query(insertOpenDuring):', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return results;
}