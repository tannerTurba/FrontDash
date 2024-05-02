'use server';
import { ZodError, z } from 'zod';
import { createOrder, insertPaidWith, insertOrderFrom, insertCreditCard } from '@/scripts/order';
import { parse } from 'path';


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
        } = parsedOrder.data;
        // Create new order row
        let cvvInt = Number(securityCode);
        let priceFloat = parseFloat(price);
        let tipsFloat = parseFloat(tips);
        let order = await createOrder({ time, tipsFloat, priceFloat });
        let cNumber = await insertCreditCard({cardNumber, cvvInt, expirationDate});
        let paidWith = await insertPaidWith({cardNumber: cNumber, orderId: order});
        
        console.log(restaurantId);
        let orderFrom = await insertOrderFrom({orderId: order, businessId: restaurantId});
       
       return `Success! OrderId: ${order}`;
    }
    let err = parsedOrder as { error: ZodError };
    let messages = err.error.errors.map((x) => x.message);
    return messages.join('\n');
}
