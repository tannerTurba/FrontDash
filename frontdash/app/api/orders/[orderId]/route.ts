import { assignDriver } from "@/scripts/order";
import { updateUserStatus } from "@/scripts/user";
import { headers } from "next/headers";

export async function POST(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    const headersList = headers();
    const driverId = headersList.get('driverId');
    const id = params.orderId;

    await assignDriver(id, driverId);
    await updateUserStatus(driverId, 'busy');

    const responseBody = { };

    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}