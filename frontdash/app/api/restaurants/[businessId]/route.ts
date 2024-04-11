import { reactivate, withdrawById } from "@/scripts/business";
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
    { params }: { params: { businessId: string } }
) {
    const headersList = headers();
    const actionType = headersList.get('actionType');
    const id = params.businessId;

    let status;
    if (actionType === 'activate' || actionType === 'pending') {
        await reactivate(id);
        status = 'active';
    }
    else {
        await withdrawById(id);
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