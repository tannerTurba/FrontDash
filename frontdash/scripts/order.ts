import { PrismaClient, Order } from '@prisma/client';

export async function getOrders(managerBusinessId: string): Promise<Order[]> {
    const prisma = new PrismaClient();
    try {
        return await prisma.$queryRaw`SELECT \`Order\`.*
        FROM \`Order\`
        JOIN \`From\` ON \`Order\`.id = \`From\`.orderId
        JOIN Business ON \`From\`.businessId = Business.id
        WHERE Business.id = ${managerBusinessId}`;
    }
     catch (error) {
        console.error('Error fetching Orders:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}