import { reactivate, withdrawById } from "@/scripts/business";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getRestaurantById, getAvailabilityByBusiness, getContactInfoByBusiness, getFoodItemsByBusiness } from "@/scripts/business";

export async function GET(
    req: Request
) {
    try {
        const headersList = headers();
        const restaurantId = headersList.get('id');

        const [menuItems, restaurant, availability, contactInfo] = await Promise.all([
            getFoodItemsByBusiness(restaurantId),
            getRestaurantById(parseInt(restaurantId, 10)),
            getAvailabilityByBusiness(parseInt(restaurantId, 10)),
            getContactInfoByBusiness(parseInt(restaurantId, 10))
        ]);

        const restaurantData = {
            menuItems,
            restaurant,
            availability,
            contactInfo
        };

        return NextResponse.json(restaurantData);
    } catch (error) {
        console.error('Error:', error);
    }
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