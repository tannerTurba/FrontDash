import { PrismaClient, Food } from "@prisma/client"

export async function getFoodItem(id: number): Promise<Food> {
    const prisma = new PrismaClient();
    let food;
    try {
        food = await prisma.$queryRaw`SELECT *
        FROM Food
        WHERE id = ${id};`;
    }
    catch (error) {
        console.error('Error executing raw query(getFoodItem):', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return food as Food;
}

export async function editFoodItem(
    id: number,
    newName: string,
    newPrice: number,
    newStock: number
): Promise<string> {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`UPDATE Food
        SET name = ${newName},
            price = ${newPrice},
            stock = ${newStock}
        WHERE id = ${id};`;
    }
    catch (error) {
            console.error('Error executing raw query(updateContactInfo):', error);
            return "error updating information";
    }
    finally {
        await prisma.$disconnect();
    }
    return "Success: Food information updated!";
}

export async function insertFoodItem(
    name:string,
    price:number,
    stock:number,
    resId:number
    ): Promise<string> {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`INSERT INTO Food (name, price, stock) VALUES (${name}, ${price}, ${stock})`
        const result = await prisma.$queryRaw`SELECT LAST_INSERT_ID() as id`;
        const newId = Number(result[0]?.id);
        await prisma.$queryRaw`INSERT INTO Offers (businessId, foodId) VALUES (${resId}, ${newId})`
    }
    catch (error) {
        console.error('Error creating Food item:', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return "Success: Created Food Item!";
}

export async function removeFoodItem(id: number): Promise<string> {
    const prisma = new PrismaClient();
    try {
        await prisma.$queryRaw`UPDATE Offers
        SET businessId = null
        WHERE foodId = ${id};`;
    }
    catch (error) {
        console.error('Error removing Food item:', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return "Success: Removed Food item!";
}