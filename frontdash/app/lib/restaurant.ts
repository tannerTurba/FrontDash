'use server';

import { z } from 'zod';
import { PrismaClient, User, Business, ContactInfo } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function registerRestaurant(data: Object, image: Blob) : Promise<string> {
    const parsedCredentials = z
        .object({ 
            name: z.string().max(30),
            about: z.string().max(1000),
            firstName: z.string().max(20),
            lastName: z.string().max(20),
            email: z.string().email().max(35),
            phone: z.string().regex( /\([0-9]{3}\)[0-9]{3}-[0-9]{4}/, {
                message: 'Invalid phone number. Check formatting: (xxx)xxx-xxxx'
            }),
            buildingNumber: z.string().max(20),
            unitNumber: z.string().max(20),
            streetAddress: z.string().min(1).max(30),
            city: z.string().min(1).max(30),
            state: z.string().min(1).max(20),
            zip: z.string().regex( /[0-9]{5}-[0-9]{4}/, {
                message: 'Invalid zip code.'
            })
        })
        .safeParse(data);

        if (parsedCredentials.success) {
            const { 
                name, 
                about, 
                firstName, 
                lastName, 
                email, 
                phone, 
                buildingNumber, 
                unitNumber,
                streetAddress, 
                city, 
                state, 
                zip 
            } = parsedCredentials.data;

            // Create new business row
            let business: Business;
            try {
                let arrayBuffer = await image.arrayBuffer();
                let buffer = Buffer.from(arrayBuffer);
                business = await prisma.business.create({
                    data: {
                        name: name, 
                        image: buffer,
                        description: about
                    }
                });
            }
            catch (error) {
                console.error('Error inserting Business data:', error);
                prisma.$disconnect();
            }

            // Create new contactInfo row
            let contactInfo: ContactInfo;
            try {
                contactInfo = await prisma.contactInfo.create({
                    data: {
                        firstName: firstName, 
                        lastName: lastName,
                        phoneNumber: parseFloat(phone),
                        buildingNumber: buildingNumber,
                        street: streetAddress,
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
                prisma.$disconnect();
            }
        }

    return "";
}