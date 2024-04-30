import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getFoodItem, editFoodItem, removeFoodItem } from "@/scripts/food";

export async function GET(
    req: Request
) {
    try {
        const headersList = headers();
        const foodId = headersList.get('id');

        const food = await getFoodItem(parseInt(foodId));

        return NextResponse.json(food);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function DELETE(
    req: Request
) {
    try {
        const headersList = headers();
        const foodId = headersList.get('id');

        const foodData = await removeFoodItem(parseInt(foodId));
        return NextResponse.json(foodData);
    }
    catch (error) {
        console.error('Error: ', error);
    }
}

export async function POST(
    req: Request
) {
    try {
        const headersList = headers();
        const foodId = headersList.get('id');
        const foodName = headersList.get('name');
        const foodPrice = headersList.get('price');
        const foodStock = headersList.get('stock');

        const id = parseInt(foodId);
        const price = parseFloat(foodPrice);
        const stock = parseInt(foodStock);

        const foodData = await editFoodItem(id, foodName, price, stock);
        return NextResponse.json(foodData);
    }
    catch (error) {
        console.error('Error: ', error);
    }
}