import { Availability, PrismaClient } from "@prisma/client";

export async function insertAvailability() : Promise<Availability> {
    const prisma = new PrismaClient();
    let row: Availability;
    try {
        row = await prisma.availability.create({ });
        console.log(`created availability: ${row}`);
    }
    catch (error) {
        console.error('Error inserting Availability data:', error);
    }
    finally {
        await prisma.$disconnect();
    }
    return row;
}

export async function updateAvailability(username: string, 
    sunOpen: string, 
    sunClose: string, 
    monOpen: string, 
    monClose: string, 
    tuesOpen: string, 
    tuesClose: string, 
    wedOpen: string, 
    wedClose: string, 
    thurOpen: string, 
    thurClose: string, 
    friOpen: string, 
    friClose: string, 
    satOpen: string, 
    satClose: string, 
    ) {
    const prisma = new PrismaClient();
    try {
      await prisma.$queryRaw`UPDATE User as u JOIN WorksFor AS w ON u.id = w.userId
        JOIN Business AS b ON b.id = w.businessId
        JOIN OpenDuring AS o ON b.id = o.businessId
        JOIN Availability AS a ON a.id = o.availabilityId
      SET a.sunOpen = ${sunOpen},
            a.sunClose = ${sunClose},
            a.monOpen = ${monOpen},
            a.monClose = ${monClose},
            a.tuesOpen = ${tuesOpen},
            a.tuesClose = ${tuesClose},
            a.wedOpen = ${wedOpen},
            a.wedClose = ${wedClose},
            a.thurOpen = ${thurOpen},
            a.thurClose = ${thurClose},
            a.friOpen = ${friOpen},
            a.friClose = ${friClose},
            a.satOpen = ${satOpen},
            a.satClose = ${satClose}
      WHERE u.username = ${username}`;
    }
    catch (error) {
      console.error('Error executing raw query(updateHours):', error);
    }
    finally {
      await prisma.$disconnect();
    }
  }
  
  export async function getAvailability(username: string) : Promise<Availability> {
    let hours;
    const prisma = new PrismaClient();
    try {
      hours = await prisma.$queryRaw`SELECT a.*
        FROM User as u JOIN WorksFor AS w ON u.id = w.userId
          JOIN Business AS b ON b.id = w.businessId
          JOIN OpenDuring AS o ON b.id = o.businessId
          JOIN Availability AS a ON a.id = o.availabilityId
        WHERE u.username = ${username}` as Availability;
    }
    catch (error) {
      console.error('Error executing raw query(getHours):', error);
    }
    finally {
      await prisma.$disconnect();
    }
    return hours;
  }

//   james.quitzon