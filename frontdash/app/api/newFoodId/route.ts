import { headers } from "next/headers";
import { insertFoodItem } from "@/scripts/food";

export async function POST(
    req: Request
) {
    try {
        const headersList = headers();
        const foodName = headersList.get('name');
        const foodPrice = headersList.get('price');
        const foodStock = headersList.get('stock');
        const restaurantId = headersList.get('resId');

        const price = parseFloat(foodPrice);
        const stock = parseInt(foodStock);
        const resId = parseInt(restaurantId);

        const foodData = await insertFoodItem(foodName, price, stock, resId);
        return Response.json(foodData);
    }
    catch (error) {
        console.error('Error: ', error);
    }
}