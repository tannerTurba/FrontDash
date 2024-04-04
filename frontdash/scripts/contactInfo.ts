import { PrismaClient, ContactInfo } from '@prisma/client';

export async function insertContactInfo(
    firstName:string, 
    lastName:string, 
    phoneNumber: string, 
    buildingNumber: string, 
    street: string, 
    unitNumber: string,
    city: string, 
    state: string, 
    zip: string, 
    email: string
    ): Promise<ContactInfo> {
    const prisma = new PrismaClient();
    try {
        return await prisma.contactInfo.create({
            data: {
                firstName: firstName, 
                lastName: lastName,
                phoneNumber: parseFloat(phoneNumber),
                buildingNumber: buildingNumber,
                street: street,
                unitNumber: unitNumber,
                city: city,
                state: state,
                zipCode: zip,
                email: email
            }
        });
    }
    catch (error) {
        console.error('Error inserting ContactInfo data:', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return null;
}

export async function editContactInfo(
    username: string,
    firstName: string, 
    lastName: string, 
    phoneNumber: string, 
    buildingNumber: string, 
    street: string, 
    unitNumber: string,
    city: string, 
    state: string, 
    zip: string, 
    email: string
    ): Promise<string> {
        const prisma = new PrismaClient();
        try {
            await prisma.$queryRaw`UPDATE User AS u JOIN ReachedAt AS r ON u.id = r.userId
            JOIN ContactInfo AS c ON c.id = r.contactId
            SET c.firstName = ${firstName},
                c.lastName = ${lastName},
                c.phoneNumber = ${phoneNumber},
                c.unitNumber = ${unitNumber},
                c.buildingNumber = ${buildingNumber},
                c.street = ${street},
                c.city = ${city},
                c.state = ${state},
                c.zipCode = ${zip},
                c.email = ${email}
            WHERE u.username = ${username};`;
        }
        catch (error) {
            console.error('Error executing raw query(updateContactInfo):', error);
            return "error updating information";
        }
        finally {
            await prisma.$disconnect();
        }
        return "Success: Contact information updated!";
}

export async function getContactData(username: string): Promise<ContactInfo> {
    const prisma = new PrismaClient();
    let info;
    try {
        info = await prisma.$queryRaw`SELECT c.* 
            FROM User AS u JOIN ReachedAt AS r ON u.id = r.userId
                JOIN ContactInfo AS c ON c.id = r.contactId 
            WHERE u.username = ${username};`;
    }
    catch (error) {
        console.error('Error executing raw query(getContactData):', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return info as ContactInfo;
}

export async function emailExists(email: string): Promise<boolean> {
    const prisma = new PrismaClient();
    let contact = null;
    try {
        contact = await prisma.contactInfo.findUnique({
            where: {
                email: email
            },
        });
    }
    catch (error) {
        console.error('Error checking for existing email: ', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return !!contact;
}