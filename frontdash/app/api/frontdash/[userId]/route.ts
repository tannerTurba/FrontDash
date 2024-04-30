import { updateUserStatus } from "@/scripts/user";
import { headers } from "next/headers";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const headersList = headers();
    const actionType = headersList.get('actionType');
    const id = params.userId;

    let status;
    if (actionType === 'activate' || actionType === 'pending') {
        await updateUserStatus(id, 'active');
        status = 'active';
    }
    else {
        await updateUserStatus(id, 'inactive');
        status = 'inactive';
    }

    const responseBody = { status: status };

    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}