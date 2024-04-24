import { Order, PrismaClient } from "@prisma/client";

export async function getOpenOrders() {
    const prisma = new PrismaClient();
    let orders;
    try {
        orders = await prisma.$queryRaw`SELECT id, status, price, time
            FROM \`Order\`
            WHERE status = 'active'
            ORDER BY time ASC`;
    } catch (error) {
        console.error('Error fetching Orders:', error);
    } finally {
        await prisma.$disconnect();
    }
    return orders;
}

export async function assignDriver(orderId, driverId) {
    const prisma = new PrismaClient();
    let orders;
    try {
        orders = await prisma.$queryRaw`UPDATE \`Order\`
            SET driverId = ${driverId}, status = 'waiting'
            WHERE id = ${orderId}`;
    } catch (error) {
        console.error('Error assigning drivers:', error);
    } finally {
        await prisma.$disconnect();
    }
    return orders;
}

export function formatDate(date) {
    // Get month, day, year, hours, and minutes
    var month = date.getMonth() + 1; // Months are zero-based
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
  
    // Ensure leading zeros
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
  
    // Construct the string in desired format
    var dateString = month + "-" + day + "-" + year + " " + hours + ":" + minutes;
  
    return dateString;
}