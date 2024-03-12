'use server';

import { z } from 'zod';
import { PrismaClient, User, Business, ContactInfo } from '@prisma/client';
import { createUser, insertUserReachedAt, insertWorksAs, insertWorksFor } from '@/scripts/account'
import { insertBusiness, insertBusinessReachedAt } from '@/scripts/business';
import { insertContactInfo } from '@/scripts/contactInfo';

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
            let arrayBuffer = await image.arrayBuffer();
            let buffer = Buffer.from(arrayBuffer);
            let business = await insertBusiness(name, buffer, about);
                
            // Create new contactInfo row
            let contactInfo = await insertContactInfo(firstName, lastName, phone, buildingNumber, streetAddress, unitNumber, city, state, zip, email);

            // Insert relationship
            await insertBusinessReachedAt(business.id.toString(), contactInfo.id.toString());
            
            // Insert manager account
            let manager = {
                username: `${business.name}${business.id}`,
                password: generatePassword(6),
                status: 'pending'
            }
            let managerId = await createUser(manager.username, manager.password, manager.password).then((data) => {return data.id});
            
            // Insert manager relations
            await insertUserReachedAt(managerId.toString(), contactInfo.id.toString());
            await insertWorksAs(managerId, 3, 'active');
            await insertWorksFor(managerId, business.id);

            return `Restaurant registered! Manager username and password:\n\t${manager.username}\n\t${manager.password}`;
        }
    return "Error: could not register restaurant";
}

function generatePassword(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
