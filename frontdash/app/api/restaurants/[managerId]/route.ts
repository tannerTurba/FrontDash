import { reactivate, withdraw } from "@/scripts/business";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { restaurantName: string } }
) {
    console.log('HITTING API');
    return NextResponse.json({ msg: `Hello, ${params.restaurantName}, from server` });
}

export async function POST(
    req: Request,
    { params }: { params: { managerId: string } }
) {
    const headersList = headers();
    const actionType = headersList.get('actionType');
    const id = params.managerId;
    console.log(`name on server side: ${id}`);

    let status;
    if (actionType === 'activate') {
        await reactivate(id);
        status = 'active';
    }
    else {
        await withdraw(id);
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