'use server';

import { ZodError, z } from 'zod';
import { createUser, insertUserReachedAt, insertWorksAs, insertWorksFor } from '@/scripts/account'
import { insertBusiness, insertBusinessReachedAt } from '@/scripts/business';
import { insertContactInfo, emailExists } from '@/scripts/contactInfo';
import { cookies } from 'next/headers';
import { updateAvailability } from '@/scripts/availability';

export async function registerRestaurant(data: Object) : Promise<string> {
    const parsedCredentials = z
        .object({ 
            name: z.string().max(30),
            about: z.string().max(1000),
            firstName: z.string().max(20),
            lastName: z.string().max(20),
            email: z.string().email().max(35),
            phone: z.string().regex( /[0-9]{10}/, {
                message: 'Invalid phone number. Check formatting: xxxxxxxxxx'
            }),
            buildingNumber: z.string().max(20),
            unitNumber: z.string().max(20),
            streetAddress: z.string().min(1).max(30),
            city: z.string().min(1).max(30),
            state: z.string().min(1).max(20),
            zip: z.string().regex(/[0-9]{5}(-[0-9]{4})?/, {
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

            // Check that email doesn't already exist
            if (await emailExists(email)) {
                return 'This email is already registered with an account!';
            }

            // Create new business row
            let business = await insertBusiness(name, about);
                
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
            let user = await createUser(manager.username, manager.password, manager.status);
            
            // Insert manager relations
            await insertUserReachedAt(user.id.toString(), contactInfo.id.toString());
            await insertWorksAs(user.id, 1, 'active');
            await insertWorksFor(user.id, business.id);

            return `Success! Manager username and password:\n\t${manager.username}\n\t${manager.password}`;
        }
        let err = parsedCredentials as { error: ZodError };
        let messages = err.error.errors.map((x) => x.message);
    return messages.join(", ");
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

export async function updateHours(data: Object) : Promise<string> {
    const username = cookies().get('username').value;
    const parsedCredentials = z
        .object({ 
            sunOpen: z.string(),
            sunClose: z.string(),
            monOpen: z.string(),
            monClose: z.string(),
            tuesOpen: z.string(),
            tuesClose: z.string(),
            wedOpen: z.string(),
            wedClose: z.string(),
            thurOpen: z.string(),
            thurClose: z.string(),
            friOpen: z.string(),
            friClose: z.string(),
            satOpen: z.string(),
            satClose: z.string(),
        })
        .safeParse(data);

    if (parsedCredentials.success) {
        let { 
            sunOpen,
            sunClose,
            monOpen,
            monClose,
            tuesOpen,
            tuesClose,
            wedOpen,
            wedClose,
            thurOpen,
            thurClose,
            friOpen,
            friClose,
            satOpen,
            satClose 
        } = parsedCredentials.data;
        
        await updateAvailability(username, sunOpen, sunClose, monOpen, monClose, tuesOpen, 
            tuesClose, wedOpen, wedClose, thurOpen, thurClose, friOpen, friClose, satOpen, satClose);
        return `Success! The opening hours have been updated!`;
    }

    let err = parsedCredentials as { error: ZodError };
    let messages = err.error.errors.map((x) => x.message);
    return messages.join(", ");
}