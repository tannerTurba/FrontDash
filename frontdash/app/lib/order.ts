'use server';
import { ZodError, z } from 'zod';
import { createOrder, insertPaidWith, insertOrderFrom, insertCreditCard, insertPlaces } from '@/scripts/order';
import { parse } from 'path';
import { insertContactInfo } from '@/scripts/contactInfo';


export async function registerOrder(data: Object) : Promise<string> {
    const parsedOrder = z
        .object({ 
            time: z.date(),
            price: z.string(),
            tips: z.string(),
            restaurantId: z.string(),
            cardNumber: z.string().regex(/[0-9]{16}/, {
                message: 'Invalid card number. Check formatting: xxxxxxxxxxxxxxxx'
            }),
            expirationDate: z.string(),
            securityCode: z.string().regex(/[0-9]{3}/, {
                message: 'Invalid CVV. Check formatting: xxx'
            }),
            firstName: z.string(),
            lastName: z.string(),
            phone: z.string(),
            buildingNumber: z.string().optional(),
            streetAddress: z.string(),
            unitNumber: z.string().optional(),
            city: z.string(),
            state: z.string(),
            zip: z.string(),
            email: z.string().optional()
        })
        .safeParse(data);

    if (parsedOrder.success) {
        const { 
            time, 
            price, 
            tips,
            restaurantId,
            cardNumber,
            expirationDate,
            securityCode,
            firstName,
            lastName,
            phone: phoneNumber,
            buildingNumber,
            streetAddress,
            unitNumber,
            city,
            state,
            zip,
            email
        } = parsedOrder.data;
        // Create new order row
        let cvvInt = Number(securityCode);
        let priceFloat = parseFloat(price);
        let tipsFloat = parseFloat(tips);
        let order = await createOrder({ time, tipsFloat, priceFloat });
        let cNumber = await insertCreditCard({ cardNumber, cvvInt, expirationDate });
        let paidWith = await insertPaidWith({ cardNumber: cNumber, orderId: order });
        console.log(restaurantId);
        let orderFrom = await insertOrderFrom({ orderId: order, businessId: restaurantId });
        let contactInfo = await insertContactInfo(
            firstName,
            lastName,
            phoneNumber,
            buildingNumber,
            streetAddress,
            unitNumber,
            city,
            state,
            zip,
            email
        );
        let contactId = contactInfo.id;
        console.log(contactId);
        let places = await insertPlaces({ orderId: order, contactId: contactId });
       
       return `Success! OrderId: ${order}`;
    }
    let err = parsedOrder as { error: ZodError };
    let messages = err.error.errors.map((x) => x.message);
    return messages.join('\n');
}
