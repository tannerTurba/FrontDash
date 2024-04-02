'use server';

import { ZodError, z } from 'zod';
import { createUser, getWorkingFor, insertUserReachedAt, insertWorksAs, insertWorksFor } from '@/scripts/account'
import { editContactInfo, emailExists, getContactData, insertContactInfo } from '@/scripts/contactInfo';
import { getUser } from '@/auth';
import { cookies } from 'next/headers';
import { ContactInfo } from '@prisma/client';

export async function registerEmployee(data: Object) : Promise<string> {
    const parsedCredentials = z
        .object({ 
            firstName: z.string().max(20),
            lastName: z.string().max(20),
            phone: z.string().regex( /[0-9]{10}/, {
                message: 'Invalid phone number. Check formatting: xxxxxxxxxx'
            }),
            manager: z.string().min(1)
        })
        .safeParse(data);

        if (parsedCredentials.success) {
            const { 
                firstName, 
                lastName, 
                phone,
                manager
            } = parsedCredentials.data;

            // Create new contactInfo row
            let contactInfo = await insertContactInfo(firstName, lastName, phone, null, null, null, null, null, null,  null);

            // Create new user row
            let userData = {
                username: `${firstName.charAt(0).toLowerCase()}${lastName.slice(0, 6).toLowerCase()}${contactInfo.id}`,
                password: generatePassword(6),
                status: 'active'
            };
            let user = await createUser(userData.username, userData.password, userData.status);
                        
            // Insert manager relations
            await insertUserReachedAt(user.id.toString(), contactInfo.id.toString());
            await insertWorksAs(user.id, 3, 'active');

            let managerData = await getUser(manager);
            console.log(`managerData = ${JSON.stringify(managerData)}---------------------------`);
            let businessId = await getWorkingFor(managerData.id);
            console.log(`busisnessID = ${businessId} ${typeof businessId}---------------------------`);

            if (businessId != '') {
                await insertWorksFor(user.id, +businessId);
            }
            else {
                return `Your account is not associated with a business.`;
            }

            return `Success! Employee username and password:\n\t${userData.username}\n\t${userData.password}`;
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

export async function updateContactInfo(data: Object) : Promise<string> {
    const username = cookies().get('username').value;
    const parsedCredentials = z
        .object({ 
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

            console.log(`------------------phone: ${phone} ------------`);
            // Check that email doesn't already exist
            let existingInfo = (await getContactInfo())[0].email;
            if (email !== existingInfo && await emailExists(email)) {
                return 'This email is already registered with an account!';
            }

            // Edit contactInfo
            let status = await editContactInfo(username, firstName, lastName, phone, buildingNumber, streetAddress, unitNumber, city, state, zip, email);

            return status;
        }
        let err = parsedCredentials as { error: ZodError };
        let messages = err.error.errors.map((x) => x.message);
    return messages.join(", ");
  }

export async function getContactInfo(): Promise<ContactInfo> {
    const username = cookies().get('username').value;
    return getContactData(username);
}