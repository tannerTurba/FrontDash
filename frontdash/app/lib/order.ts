'use server';
import { ZodError, z } from 'zod';
import { createOrder, getPaidWith, insertPaidWith, insertOrderContains, insertOrderFrom } from '@/scripts/order';


export async function registerOrder(data: Object) : Promise<string> {
    const parsedOrder = z
        .object({ 
            time: z.date(),
            price: z.number(),
            tips: z.number()
        })
        .safeParse(data);

    if (parsedOrder.success) {
        const { 
            time, 
            price, 
            tips
        } = parsedOrder.data;

        // Create new order row
        let order = await createOrder({ time, price, tips });
        
        return `Success! Order ID: ${order.id}`;
    }
    let err = parsedOrder as { error: ZodError };
    let messages = err.error.errors.map((x) => x.message);
    return messages.join('\n');
}
