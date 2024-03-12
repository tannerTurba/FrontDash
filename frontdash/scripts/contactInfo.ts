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