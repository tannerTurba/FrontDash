import { PrismaClient, Order } from '@prisma/client';

export async function getAllOrders(): Promise<Order[]> {
    const prisma = new PrismaClient();
    try {
        return await prisma.order.findMany();
    } catch (error) {
        console.error('Error fetching Orders:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}