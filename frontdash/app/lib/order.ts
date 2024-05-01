'use server';
import { ZodError, z } from 'zod';
import { createOrder, getPaidWith, insertPaidWith, insertOrderContains, insertOrderFrom, insertCreditCard } from '@/scripts/order';


export async function registerOrder(data: Object) : Promise<string> {
    const parsedOrder = z
        .object({ 
            time: z.date(),
            price: z.number(),
            tips: z.number(),
            cardNumber: z.string().regex(/[0-9]{16}/, {
                message: 'Invalid card number. Check formatting: xxxxxxxxxxxxxxxx'
            }),
            expirationDate: z.string(),
            securityCode: z.string().regex(/[0-9]{3}/, {
                message: 'Invalid CVV. Check formatting: xxx'
            }),
        })
        .safeParse(data);

    if (parsedOrder.success) {
        const { 
            time, 
            price, 
            tips,
            cardNumber,
            expirationDate,
            securityCode,
        } = parsedOrder.data;
        // Create new order row
        let cvvInt = Number(securityCode);
        // let order = await createOrder({ time, price, tips });
        let cNumber = await insertCreditCard({cardNumber, cvvInt, expirationDate});
        
        console.log(restaurantName);
       // return `Success! Order ID: ${order}`;
        return `Success! Card Number: ${cNumber}`;
    }
    let err = parsedOrder as { error: ZodError };
    let messages = err.error.errors.map((x) => x.message);
    return messages.join('\n');
}
