import { PrismaClient, User } from "@prisma/client";

export async function getFrontdashEmployees() {
    const prisma = new PrismaClient();
    let employees;
    try {
        employees = await prisma.$queryRaw`SELECT User.id AS id, User.username AS username, User.password AS password, User.status AS status
            FROM User JOIN WorksAs ON User.id = WorksAs.userId
                JOIN Role ON Role.id = WorksAs.roleId
            WHERE Role.id = '4'`;
    } catch (error) {
        console.error('Error updating User status:', error);
    } finally {
        await prisma.$disconnect();
    }
    return employees;
}