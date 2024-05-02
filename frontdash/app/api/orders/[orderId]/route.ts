import { assignDriver, formatDate, getOrderStatus } from "@/scripts/order";
import { updateUserStatus } from "@/scripts/user";
import { headers } from "next/headers";

export async function POST(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    const headersList = headers();
    const driverId = Number.parseInt(headersList.get('driverId'));
    const id = Number.parseInt(params.orderId);

    // Delivery time is 10-15 minutes(in milliseconds) from now.
    let deliveryTime = new Date(Date.now() + (((Math.random() * 5) + 10) * 60 * 1000));
    console.log(formatDate(deliveryTime));

    await assignDriver(id, driverId, deliveryTime);
    await updateUserStatus(driverId, 'busy');

    const responseBody = { };

    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function GET(
    req: Request
) {
    try {
        const headersList = headers();
        const orderId = headersList.get('id');

        const id = parseInt(orderId);

        const orderStatus = await getOrderStatus(id);
        return Response.json(orderStatus);
    }
    catch (error) {
        console.error('Error: ', error);
    }
}