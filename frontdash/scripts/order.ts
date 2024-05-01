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

export async function assignDriver(orderId, driverId, deliveryTime) {
    const prisma = new PrismaClient();
    let orders;
    try {
        orders = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                driverId: driverId,
                deliveryTime: deliveryTime
            }
        });
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

export async function createOrder(data: OrderData) : Promise<string> {
    const prisma = new PrismaClient();
    
  try {
    const newOrder = await prisma.order.create({
       
        data: {
        time: data.time,
        deliveryTime: data.time,
        status: 'active',
        price: data.price,
        tips: data.tips,

      },
    });
    return newOrder.id.toString();
  } catch (error) {
    console.error('Error creating Order:', error);
  } finally {
    await prisma.$disconnect();
  }
  return null;
}

export async function insertCreditCard(data: OrderData) : Promise<string> {
    const prisma = new PrismaClient();
    
  try {
    const newCard = await prisma.creditCard.create({
       
        data: {
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        securityCode: data.cvvInt,

      },
    });
    return newCard.cardNumber.toString();
  } catch (error) {
    console.error('Error creating Order:', error);
  } finally {
    await prisma.$disconnect();
  }
  return null;
}